<template>
  <div class="device-grid">
    <DeviceCard
      v-for="(device, deviceId) in devices"
      :key="deviceId"
      :device="device"
      @selectDevice="selectedDevice = $event"
    />
  </div>

  <DeviceStatsSummary
    v-if="selectedDevice"
    :deviceId="selectedDevice"
  />
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

  @media (max-width: 600px) {
    .device-grid {
      grid-template-columns: 1fr; /* Single column on smaller screens */
    }
  }
</style>
