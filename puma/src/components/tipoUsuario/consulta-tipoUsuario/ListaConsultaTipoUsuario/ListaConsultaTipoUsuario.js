import UserService from '../../../../services/UserService';

export default {
  beforeMount() {
    this.getData();
  },

  data: () => ({
    listUserTypes: [],
    userService: new UserService(),
    isLoading: false,
  }),

  async mounted() {
    try {
      this.getData();
    } catch (error) {
      this.$store.commit('CLOSE_LOADING_MODAL');
    }
  },

  methods: {
    async getData() {
      this.isLoading = true;
      this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
      try {
        this.userService.getUserType().then(async (response) => {
          this.listUserTypes = response.data;
        });
        this.isLoading = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
      } catch (error) {
        this.isLoading = false;
        this.$store.commit('CLOSE_LOADING_MODAL');
      }
    },
    goToEditar(typeName) {
      this.$router.push({ path: `/tipoUsuario/editar/${typeName}` }).catch(() => { });
    },
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
