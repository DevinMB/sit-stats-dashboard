<template>
  <div class="device-stats-summary">

    <h3>Filters</h3>
    <VueDatePicker v-model="filters.startTimestamp" :is-24="false"  placeholder="Start Timestamp"></VueDatePicker>
    <VueDatePicker v-model="filters.endTimestamp" :is-24="false"  placeholder="End Timestamp"></VueDatePicker>
    
    <input type="number" v-model="filters.minDuration" placeholder="Min Duration (Seconds)">
    <input type="number" v-model="filters.maxDuration" placeholder="Max Duration (Seconds)">
    <input type="number" v-model="filters.minAvgValue" placeholder="Min Avg Value">
    <input type="number" v-model="filters.maxAvgValue" placeholder="Max Avg Value">
    <button @click="applyFilters">Apply</button>


    <h3>Device Stats Summary for {{ deviceId }}</h3>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="deviceStats">
      <pre>{{ deviceStats }}</pre>
    </div>
    <div v-else>
      No stats to display.
    </div>
  </div>
</template>

<script>
import APIHandler from '../services/APIHandler.js';
import { mapActions } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'DeviceStatsSummary',
  components: {VueDatePicker},
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      deviceStats: null,
      loading: false,
      error: null,
      filters: {
        startTimestamp: null,
        endTimestamp: null,
        minDuration: null, 
        maxDuration: null, 
        minAvgValue: null, 
        maxAvgValue: null
      },
    };
  },
  async created() {
    await this.fetchDeviceStats();
  },
  methods: {
    ...mapActions(['updateDeviceStats']),
    async fetchDeviceStats(startTimestamp,endTimestamp,minDuration,maxDuration,minAvgValue,maxAvgValue) {
      this.loading = true;
      try {
        this.deviceStats = await APIHandler.getDeviceSummaryStats(this.deviceId,startTimestamp,endTimestamp,minDuration,maxDuration,minAvgValue,maxAvgValue);
        this.updateDeviceStats(this.deviceStats);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    formatDateToEpoch(date) {
      return date ? Math.floor(date.getTime() / 1000) : null; // Convert to Unix timestamp in seconds
    },
    applyFilters() {
      const startTimestampFormatted = this.formatDateToEpoch(this.filters.startTimestamp);
      const endTimestampFormatted = this.formatDateToEpoch(this.filters.endTimestamp);
      this.fetchDeviceStats(startTimestampFormatted, endTimestampFormatted, this.filters.minDuration, this.filters.maxDuration, this.filters.minAvgValue, this.filters.maxAvgValue);
    }
  }
};
</script>

<style>
.device-stats-summary {
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
}
</style>
