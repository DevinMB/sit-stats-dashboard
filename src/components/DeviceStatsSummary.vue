<template>
  <div class="device-stats-summary" :class="{ 'is-floating': showFilters }">
    
    


    <h2>{{ deviceId }} Summary</h2>
    <h5>Default filter is sits greater than 10s</h5>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="deviceStats" class="device-stats-container">
        <div class="stat-section">
          <h5>Last Sit</h5>
          <p><strong>Date Time:</strong> {{ formatEpochToDateTime( deviceStats.lastSit.startTimestamp )}}</p>
          <p><strong>Duration:</strong> {{ formatDuration(deviceStats.lastSit.sitDuration) }}</p>
          <p><strong>Average Value:</strong> {{ deviceStats.lastSit.avgValue }}</p>
        </div>

        <div class="stat-section">
          <h5>Max Sit</h5>
          <p><strong>Date Time:</strong> {{ formatEpochToDateTime( deviceStats.maxSit.startTimestamp )}}</p>
          <p><strong>Duration:</strong> {{ formatDuration(deviceStats.maxSit.sitDuration) }}</p>
          <p><strong>Average Value:</strong> {{ deviceStats.maxSit.avgValue }}</p>
        </div>

        <div class="stat-section">
          <h5>Sit Counts</h5>
          <p><strong>Morning:</strong> {{ deviceStats.sitCounter.morningSitCount }}</p>
          <p><strong>Afternoon:</strong> {{ deviceStats.sitCounter.afternoonSitCount }}</p>
          <p><strong>Evening:</strong> {{ deviceStats.sitCounter.eveningSitCount }}</p>
          <p><strong>Night:</strong> {{ deviceStats.sitCounter.nightSitCount }}</p>
          <p><strong>Total:</strong> {{ deviceStats.sitCounter.totalSitCount }}</p>
        </div>

        <div class="stat-section">
          <h5>Total Sit Time</h5>
          <p>{{ formatDuration(deviceStats.totalSitTime) }}</p>
        </div>
    </div>
    <div v-else>
      No stats to display.
    </div>

    <transition name="filter-toggle">
      <div class="filters-container" >
          <VueDatePicker v-model="filters.startTimestamp" :is-24="false" placeholder="Start Timestamp"></VueDatePicker>
          <VueDatePicker v-model="filters.endTimestamp" :is-24="false" placeholder="End Timestamp"></VueDatePicker>
          
          <input type="number" v-model="filters.minDuration" placeholder="Min Duration (Seconds)">
          <input type="number" v-model="filters.maxDuration" placeholder="Max Duration (Seconds)">
          <input type="number" v-model="filters.minAvgValue" placeholder="Min Avg Value">
          <input type="number" v-model="filters.maxAvgValue" placeholder="Max Avg Value">
          <button @click="fetchDeviceStats">Apply</button>
      </div>
    </transition>

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
      showFilters: false,
      deviceStats: null,
      loading: false,
      error: null,
      filters: {
        startTimestamp: null,
        endTimestamp: null,
        minDuration: 10, 
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
    async fetchDeviceStats() {
      this.loading = true;
      try {
        const startTimestampFormatted = this.formatDateToEpoch(this.filters.startTimestamp);
        const endTimestampFormatted = this.formatDateToEpoch(this.filters.endTimestamp);
        this.deviceStats = await APIHandler.getDeviceSummaryStats(this.deviceId,startTimestampFormatted,endTimestampFormatted,this.filters.minDuration,this.filters.maxDuration,this.filters.minAvgValue,this.filters.maxAvgValue);
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
    formatEpochToDateTime(epoch) {
      const date = new Date(epoch * 1000); // Convert epoch to milliseconds
      const options = {
        timeZone: 'America/New_York', // EST timezone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 12-hour format with AM/PM
        };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    formatDuration(seconds) {
      // Helper method to convert duration from seconds to a more human-readable format
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsLeft = seconds % 60;
      return `${hours}h ${minutes}m ${secondsLeft}s`;
    },
  }
};
</script>


<style scoped>
.device-stats-summary {
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  max-width: 1200px; /* Adjust the max-width as needed */
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;
}

.device-stats-summary h3,
.device-stats-summary h2,
.device-stats-summary h5 {
  text-align: left;
  margin: 0; /* Remove default margin if desired */
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Adjust minmax for input size */
  gap: 10px;
  margin-bottom: 20px;
  margin-top:10px;
  /* background-color: #fff; */

}
.device-stats-summary.is-floating {
  /* transform: scale(1.05); Slightly larger to give a floating feel */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for floating effect */
}

button {
  cursor: pointer;
  margin: 5px;
}

.device-stats-container {
  /* background-color: #f2f2f2; Light grey background */
  border: 1px solid #ccc; /* Light grey border */
  padding: 10px;
  border-radius: 5px;
  background-color: #fff; 
  margin-top: 10px;
  text-align: left;
}

.stat-section {
  border-bottom: 1px solid #eee; /* Light border for each section */
  padding-bottom: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
}
.stat-section h5 {
  color: #333; /* Darker color for subheading */
  margin-top: 0;
  
}
.stat-section p {
  color: #666; /* Lighter color for text */
  margin: 5px 0; /* Spacing around paragraphs */
  padding-left: 45px;
}

.filter-toggle-enter-active, .filter-toggle-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.filter-toggle-enter, .filter-toggle-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* input {
 border-color: light rgb(215, 215, 215);
 border-width: 1px;
 border-radius: 2px;
 font-family: var(--dp-font-family);
} */


input {
    background-color: #fff;
    border-radius: 4px;
    
    font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border: 1px solid #DDDDDD;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    font-size: var(1rem);
    line-height: calc(var(1rem)*1.5);
    padding: 6px 30px 6px 12px;
    border-width: 1px;
    color: black;
    box-sizing: border-box;
    font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

@media (max-width: 600px) {
  .filters-container {
    grid-template-columns: 1fr; /* Single column on smaller screens */
  }
}

</style>