<template>
    <div class="sit-statistics">
      <h2>Sit Statistics</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error loading sit statistics.</div>
      <ul v-else>
        <li >
          {{ sitStats}}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import APIHandler from '../services/APIHandler.js';
  
  export default {
    name: 'SitStatistics',
    data() {
      return {
        sitStats: [],
        loading: false,
        error: null
      };
    },
    async created() {
      try {
        this.loading = true;
        this.sitStats = await APIHandler.fetchSitStatistics();
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    }
  };
  </script>
  
  <style>
  .sit-statistics {
    margin-bottom: 20px;
  }
  </style>
  