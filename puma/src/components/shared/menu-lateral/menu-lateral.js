import ItemMenuLateral from './item-menu-lateral/ItemMenuLateral.vue';
import USER_CONST from '../../../utils/enums/users.enum';

export default {
  name: 'MenuLateral',
  components: {
    ItemMenuLateral,
  },
  props: {},
  data() {
    return {
      user: this.$store.getters.user,
      menuItems: {
        adminProjects: {
          basePath: '/projetos-plataforma',
          title: 'Projetos',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-2.svg'),
          show: () => this.user.isAdmin,
          onclick: () => {
            this.$router.push({ path: '/projetos-plataforma' }).catch(() => { });
          },
        },
        subjectProjects: {
          basePath: '/projetos-disciplina',
          title: 'Projetos das Disciplinas',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-2.svg'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/projetos-disciplina' }).catch(() => { });
          },
        },
        myProjects: {
          basePath: '/meus-projetos',
          title: 'Meus Projetos',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-1.png'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/meus-projetos' }).catch(() => { });
          },
        },
        subjects: {
          basePath: '/disciplinas',
          title: 'Disciplinas',
          // eslint-disable-next-line
          iconUrl: require('@/assets/subjects.png'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/disciplinas' }).catch(() => { });
          },
        },
        about: {
          basePath: '/sobre',
          title: 'Informações e Objetivos',
          // eslint-disable-next-line
          iconUrl: require('@/assets/subjects.png'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/sobre' }).catch(() => { });
          },
        },
        classItem: {
          basePath: '/turmas',
          title: 'Turmas',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-5.svg'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/turmas' }).catch(() => { });
          },
        },
        userType: {
          basePath: '/tipoUsuario',
          title: 'Tipo Usuario',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-4.svg'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/tipoUsuario' }).catch(() => { });
          },
        },
        contacts: {
          basePath: '/infoContatos',
          title: 'Contato',
          // eslint-disable-next-line
          iconUrl: require('@/assets/contacts.svg'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/infoContatos' }).catch(() => { });
          },
        },
        logout: {
          title: 'Sair',
          // eslint-disable-next-line
          iconUrl: require('@/assets/menu-3.svg'),
          show: () => true,
          onclick: () => {
            this.$store.commit('RESET_USER_STATE');
            this.$router.push({ path: '/login' }).catch(() => { });
          },
        },
        newTeacher: {
          basePath: '/NovosProfessores',
          title: 'Novos Professores',
          // eslint-disable-next-line
          iconUrl: require('@/assets/subjects.png'),
          show: () => true,
          onclick: () => {
            this.$router.push({ path: '/NovosProfessores' }).catch(() => { });
          },
        },
      },
    };
  },
  methods: {
    redirectToUserProjects() {
      this.$router.push({ path: '/meus-projetos' }).catch(() => { });
    },
    showMenuHamburger(element) {
      const content = document.getElementById(element);

      if (!content.style.display) {
        content.style.display = 'block';
      } else if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    },
  },
};
