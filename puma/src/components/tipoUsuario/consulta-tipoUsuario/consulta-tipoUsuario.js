import ListaConsultaTipoUsuario from './ListaConsultaTipoUsuario/ListaConsultaTipoUsuario.vue';

export default {
  beforeMount() {
    this.getUserTypes();
  },

  components: {
    ListaConsultaTipoUsuario,
  },

  data: () => ({
    userTypes: [],
  }),

  methods: {
    makeToast(toastTitle, toastMessage, toastVariant) {
      this.$bvToast.toast(toastMessage, {
        title: toastTitle, variant: toastVariant, solid: true, autoHideDelay: 4000,
      });
    },
  },
};
