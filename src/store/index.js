import { createStore } from 'vuex';

export default createStore({
  state: {
    devices: {},
    deviceStats: null,
    deviceSits: null
  },
  mutations: {
    setDeviceStatus(state, deviceStatus) {
        if (Array.isArray(deviceStatus)) {
          const devicesMap = {};
          deviceStatus.forEach(device => {
              devicesMap[device.deviceId] = device;
          });
          state.devices = devicesMap;
        } else {
          state.devices[deviceStatus.deviceId] = deviceStatus;
        }
    },
    setDeviceStats(state, stats) {
      state.deviceStats = stats;
    },
    setDeviceSits(state, sits) {
        state.deviceSits = sits;
    }
  },
  actions: {
    updateDeviceStatus({ commit }, deviceStatus) {
      commit('setDeviceStatus', deviceStatus);
    },
    updateDeviceStats({ commit }, stats) {
      commit('setDeviceStats', stats);
    },
    updateDeviceSits({ commit }, sits) {
        commit('setDeviceSits', sits);
    }
  }
});
