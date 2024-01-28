// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    deviceStats: null,
    deviceSits: null
  },
  mutations: {
    setDeviceStats(state, stats) {
      state.deviceStats = stats;
    },
    setDeviceSits(state, sits) {
        state.deviceSits = sits;
    }
  },
  actions: {
    updateDeviceStats({ commit }, stats) {
      commit('setDeviceStats', stats);
    },
    updateDeviceSits({ commit }, sits) {
        commit('setDeviceSits', sits);
    }
  }
});
