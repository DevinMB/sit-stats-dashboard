<template>
  <div class="device-grid">
    <DeviceCard
      v-for="(device, deviceId) in devices"
      :key="deviceId"
      :device="device"
      @selectDevice="toggleDeviceStats"
    />
  </div>

  <transition name="expand">
    <DeviceStatsSummary
      v-if="selectedDevice"
      :deviceId="selectedDevice"
      :key="selectedDevice"
    />
  </transition>
  
</template>

<script>
import { mapState } from 'vuex';
import DeviceCard from './DeviceCard.vue';
import DeviceStatsSummary from './DeviceStatsSummary.vue';
// import { mapActions } from 'vuex';


export default {
  name: 'DeviceGrid',
  components: {
    DeviceCard,
    DeviceStatsSummary
  },
  // methods: {
  //   ...mapActions(['updateDeviceStats', 'updateDeviceSits']),
  // },
  computed: {
    ...mapState({
      devices: state => state.devices // Accessing devices from Vuex store
    })
  },
  data(){
    return{
      selectedDevice: null
    }
  },
  methods: {
    toggleDeviceStats(deviceId) {
      // If the clicked device is already selected, deselect it, otherwise select it
      this.selectedDevice = this.selectedDevice === deviceId ? null : deviceId;
    },
  }
};
</script>

<style scoped>
  .device-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust minmax for card size */
    gap: 20px;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px; /* Adjust the max-width as needed */
  }

  .expand-enter-active, .expand-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  transition-timing-function: cubic-bezier(0, 1.05, 0.35, 1);
}
  .expand-enter, .expand-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }

  @media (max-width: 600px) {
    .device-grid {
      grid-template-columns: 1fr; /* Single column on smaller screens */
    }
  }
</style>
