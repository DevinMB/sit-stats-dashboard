<template>
  <div class="dashboard-container">
    <device-status></device-status>
    <sit-statistics></sit-statistics>
  </div>
</template>

<script>
import DeviceStatus from './components/DeviceStatus.vue';
import SitStatistics from './components/SitStatistics.vue';


export default {
  name: 'App',
  components: {
    DeviceStatus,
    SitStatistics
  }
};
</script>

<style>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
