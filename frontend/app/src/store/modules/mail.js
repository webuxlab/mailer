const state = {
  mails: [],
  mailInit: false
};

const mutations = {
  INIT_MAIL(state, mail) {
    state.mails.unshift(mail);
    state.mailInit = true;
  },
  RESET_MAIL(state) {
    state.mails = [];
    state.mailInit = false;
  }
};

const actions = {
  socket_mailRetrieved({ commit, dispatch }, data) {
    commit("INIT_MAIL", data);
    dispatch("doneLoading");
  },
  socket_emailSent({ dispatch }, data) {
    dispatch("setSuccess", data);
    dispatch("doneLoading");
  },
  resetEmails({ commit, dispatch }) {
    dispatch("setLoading");
    commit("RESET_MAIL");
  }
};

const getters = {
  mails: state => {
    return state.mails;
  }
};

export default {
  actions,
  mutations,
  state,
  getters
};
