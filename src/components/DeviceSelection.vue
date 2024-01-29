<template>
  <div class="device-selection">
    <h2>Available Devices</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error loading devices: {{ error }}</div>
    <div v-else>
      <select v-model="selectedDevice">
        <option disabled value="">Please select a device</option>
        <option v-for="device in devices" :key="device" :value="device">
          {{ device }}
        </option>
      </select>

      <h3>Filters</h3>
      <VueDatePicker v-model="filters.startTimestamp" :is-24="false"  placeholder="Start Timestamp"></VueDatePicker>
      <VueDatePicker v-model="filters.endTimestamp" :is-24="false"  placeholder="End Timestamp"></VueDatePicker>
      
      <input type="number" v-model="filters.minDuration" placeholder="Min Duration (Seconds)">
      <input type="number" v-model="filters.maxDuration" placeholder="Max Duration (Seconds)">
      <input type="number" v-model="filters.minAvgValue" placeholder="Min Avg Value">
      <input type="number" v-model="filters.maxAvgValue" placeholder="Max Avg Value">

      
      <!-- Add other filters similarly -->
      <!-- Add other filters similarly -->

      <button @click="applyFilters">Apply</button>
    </div>
  </div>
</template>

<script>
import APIHandler from '../services/APIHandler.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { mapActions } from 'vuex';

export default {
  name: 'DeviceSelection',
  components: {VueDatePicker},
  data() {
    return {
      devices: [],
      selectedDevice: '',
      deviceListing: null,
      deviceStats: null,
      filters: {
        startTimestamp: null,
        endTimestamp: null,
        minDuration: null, 
        maxDuration: null, 
        minAvgValue: null, 
        maxAvgValue: null
      },
      loading: false,
      error: null
    };
  },
  async created() {
    this.loading = true;
    try {
      this.devices = await APIHandler.getDeviceListing();
    } catch (error) {
      this.error = error.message;
    }
    this.loading = false;
  },
  methods: {
    ...mapActions(['updateDeviceStats']),
    async applyFilters() {
      if (!this.selectedDevice) {
        alert("Please select a device");
         
        return;
      }
      try {
        const startTimestampFormatted = this.formatDate(this.filters.startTimestamp);
        const endTimestampFormatted = this.formatDate(this.filters.endTimestamp);
        this.deviceStats = await APIHandler.getDeviceSummaryStats(this.selectedDevice, startTimestampFormatted, endTimestampFormatted, this.filters.minDuration, this.filters.maxDuration, this.filters.minAvgValue, this.filters.maxAvgValue);
        this.updateDeviceStats(this.deviceStats);
        this.updateDeviceSits(await APIHandler.getDeviceSits(this.selectedDevice))
      } catch (error) {
        this.error = error.message;
      }
    }, 
    formatDate(date) {
      return date ? Math.floor(date.getTime() / 1000) : null; // Convert to Unix timestamp in seconds
    }
  }
};
</script>

<style>
.device-selection {
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid black;
}
</style>
