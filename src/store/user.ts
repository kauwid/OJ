import { StoreOptions } from "vuex";
import AccessEnum from "@/access/AccessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "未登录",
      role: AccessEnum.NOT_LOGIN,
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // TODO: 从后端获取登录用户信息
      commit("updateLoginUser", {
        username: payload.username,
        role: payload.role,
      });
    },
  },
  mutations: {
    updateLoginUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
