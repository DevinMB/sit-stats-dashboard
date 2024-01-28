<template>
  <div class="dashboard-container">

    <device-selection></device-selection>
    <device-stats-summary></device-stats-summary>
  </div>
</template>

<script>

import DeviceSelection from './components/DeviceSelection.vue';
import DeviceStatsSummary from './components/DeviceStatsSummary.vue';
import { mapState } from 'vuex';


export default {
  name: 'App',
  components: {
    DeviceSelection,
    DeviceStatsSummary
  },
  computed: {
    ...mapState(['deviceStats'])
  }
};
</script>

<style>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
}
</style>
