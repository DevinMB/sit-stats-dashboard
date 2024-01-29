<template>
  <div class="device-grid">
    <DeviceCard
      v-for="(device, deviceId) in devices"
      :key="deviceId"
      :device="device"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DeviceCard from './DeviceCard.vue';

export default {
  name: 'DeviceGrid',
  components: {
    DeviceCard,
  },
  computed: {
    ...mapState({
      devices: state => state.devices // Accessing devices from Vuex store
    })
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
