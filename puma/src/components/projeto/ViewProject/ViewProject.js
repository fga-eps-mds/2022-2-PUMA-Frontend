import ProjectService from '../../../services/ProjectService';
import SubjectService from '../../../services/SubjectService';
import statusProjetoEnum from '../../../utils/enums/status-projeto.enum';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
  name: 'ViewProject',
  props: {},
  mixins: [statusProjetoEnum],
  components: {
    ReturnButton,
  },
  data() {
    return {
      editable: false,
      disabled: true,
      currentUserAdmin: false,
      initialForm: {
        projectId: null,
        name: '',
        createdAt: '',
        problem: '',
        expectedResult: '',
        status: '',
        statusDesc: '',
        feedback: '',
        mainKeyword: null,
        selectedKeywords: [],
        subject: {
          subjectId: null,
          name: '',
        },
        user: {
          userId: null,
          fullName: '',
          email: '',
          phoneNumber: '',
          updatedAt: '',
          passwordHash: '',
          isAdmin: false,
          createdAt: '',
        },
        semester: {
          semesterId: null,
          year: '',
          semester: '',
        },
        selectedSubject: null,
        selectedEvaluation: null,
      },
      form: {},
      evaluations: [
        { value: 0, text: 'Aceitar proposta' },
        { value: 1, text: 'Rejeitar proposta' },
        { value: 2, text: 'Encaminhar proposta para outra disciplina' },
        { value: 3, text: 'Eu não sei para qual disciplina encaminhar' },
      ],
      keywords: [],
      subjects: [],
    };
  },
  async created() {
    this.form = JSON.parse(JSON.stringify(this.initialForm));
    await this.handleLoadData();
    this.editable = ['SB', 'RL', 'AL'].includes(this.form.status);
  },
  methods: {
    toggleEnableForm() {
      this.disabled = !this.disabled;
    },
    isChecked(keyword) {
      return this.form.selectedKeywords.find((k) => k.value === keyword.value);
    },
    hasFeedback() {
      return ['RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC'].includes(this.form.status);
    },
    makeToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title, variant, solid: true, noAutoHide: true, appendToast: true,
      });
    },
    handleChangeEvaluation() {
      const AC_FEEDBACK = 'A proposta de projeto foi aceita e em breve poderá ser alocada a um semestre.';
      if (this.form.selectedEvaluation?.value === 0) {
        this.form.feedback = AC_FEEDBACK;
      } else {
        this.form.feedback = '';
      }
    },
    async handleLoadData() {
      try {
        const projectId = this.$route.params.id;
        const projectService = new ProjectService();
        const subjectService = new SubjectService();
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });

        const project = (await projectService.getProject(projectId)).data;
        const allSubjects = (await subjectService.getSubjects()).data;

        const {
          Keywords, User, Subject, Semester, ...rest
        } = project;

        const mainKeyword = Keywords[0].filter((k) => k.main)[0];
        const createdAt = (new Date(project.createdAt)).toLocaleString();
        const formData = {
          ...rest,
          createdAt,
          feedback: project.feedback || '',
          statusDesc: this.getDescricao(project.status),
          user: User,
          subject: Subject,
          semester: Semester,
          mainKeyword: mainKeyword && { value: mainKeyword.keywordid, text: mainKeyword.keyword },
          selectedKeywords: Keywords[0].map((k) => ({ value: k.keywordid, text: k.keyword }))
            .sort((a, b) => a.text.localeCompare(b.text)),
          selectedSubject: null,
          selectedEvaluation: null,
        };
        // eslint-disable-next-line
        this.subjects = allSubjects.map((s) => ({ value: s.subjectId, text: s.name })).sort((a, b) => a.text.localeCompare(b.text));
        this.initialForm = JSON.parse(JSON.stringify(formData));
        this.form = JSON.parse(JSON.stringify(formData));

        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro de busca', 'Infelizmente houve um erro ao carregar a sua lista de projetos, confira sua conexão com servidor e tente novamente mais tarde', 'danger');
      }
    },
    async handleSubmit() {
      try {
        const isFormValid = await this.$refs.observer.validate();
        if (!isFormValid) return;

        const projectService = new ProjectService();
        this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
        let payload = { projectId: this.form.projectId, feedback: this.form.feedback };
        if (this.form.selectedEvaluation?.value === 0) {
          payload = { ...payload, status: 'AC' };
          await projectService.evaluateProject(payload);
        } else if (this.form.selectedEvaluation?.value === 1) {
          payload = { ...payload, status: 'RC' };
          await projectService.evaluateProject(payload);
        } else if (this.form.selectedEvaluation?.value === 2) {
          payload = { ...payload, status: 'RL', subjectId: this.form.selectedSubject.value };
          await projectService.reallocateProject(payload);
        } else if (this.form.selectedEvaluation?.value === 3) {
          payload = { ...payload, status: 'AL', subjectId: this.form.selectedSubject.value };
          await projectService.reallocateProject(payload);
        }
        this.$store.commit('CLOSE_LOADING_MODAL');
        await this.$router.push({ path: '/projetos-disciplina' });
        this.makeToast('Projeto avaliado com sucesso', `O projeto "${this.form.name}" foi avaliado com sucesso`, 'success');
      } catch (error) {
        this.$store.commit('CLOSE_LOADING_MODAL');
        this.makeToast('Erro ao avaliar projeto', 'Infelizmente houve um erro ao avaliar projeto, confira sua conexão com servidor e tente novamente', 'danger');
      }
    },
    handleEvaluate() {
      this.form.feedback = '';
      this.toggleEnableForm();
    },
    handleCancelEvaluate() {
      this.form = JSON.parse(JSON.stringify(this.initialForm));
      this.toggleEnableForm();
    },
  },
};
