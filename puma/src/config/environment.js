module.exports = {
  configUser: () => {
    if (process.env.VUE_APP_ENVIRONMENT === 'dev') {
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`;
    } else if (process.env.VUE_APP_ENVIRONMENT === 'test') {
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`;
    } else if (process.env.VUE_APP_ENVIRONMENT === 'hom') {
      global.URL_GATEWAY = 'https://puma-gateway.herokuapp.com';
    } else if (process.env.VUE_APP_ENVIRONMENT === 'prod') {
      global.URL_GATEWAY = `http://${process.env.VUE_APP_IP_ADDRESS}:3004`;
    }
  },
};
