<template>
    <div class="device-listing">
      <h2>Device Listing</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error loading device status.</div>
      <ul v-else>
        <li v-for="(device) in devices" :key="device">
          {{device}}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import APIHandler from '../services/APIHandler.js';
  
  export default {
    name: 'DeviceListing',
    data() {
      return {
        devices: [],
        loading: false,
        error: null
      };
    },
    async created() {
      try {
        this.loading = true;
        this.devices = await APIHandler.getDeviceListing();
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    }
  };
  </script>
  
  <style>
  .device-status {
    margin-bottom: 20px;
  }
  </style>
  