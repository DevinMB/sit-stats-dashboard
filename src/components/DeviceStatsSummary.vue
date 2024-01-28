<template>
    <div class="device-stats-summary">
      <h3>Device Stats Summary</h3>
      <div v-if="deviceStats">
        <pre>{{ deviceStats }}</pre>
      </div>
      <div v-else>
        No stats to display.
      </div>
    </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'DeviceStatsSummary',
    computed: {
      ...mapState(['deviceStats'])
    }
  };
  </script>
  
  <style>
  .device-stats-summary {
    border: 1px solid black;
}
  </style>
  