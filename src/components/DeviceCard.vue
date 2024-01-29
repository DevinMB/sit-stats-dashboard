<template>
    <div class="device-card" @click="handleClick">
      <div class="device-image-container">
        <img src="../assets/chair-sensor-1.jpg" alt="Device Image" class="device-image" />
      </div>
      <div class="device-info">
        <h3 class="device-name">{{ device.deviceId }}</h3>
        <p class="device-status">Status: {{ device.status }}</p>
        <router-link :to="`/device/${device.id}`" class="details-link">View Details</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DeviceCard",
    props: {
      device: {
        type: Object,
        required: true,
      },
    },
    methods: {
      handleClick() {
        this.$emit('selectDevice', this.device.deviceId);
      }
  }
  };
  </script>
  
  <style scoped>
  .device-card {
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .device-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .device-image-container {
    flex: 0 0 120px; /* Adjust the size as needed */
    background: #f5f5f5;
  }
  
  .device-image {
    width: 100%;
    height: auto;
    object-fit: cover; /* Adjust based on your image aspect ratio */
  }
  
  .device-info {
    padding: 10px;
    flex-grow: 1;
  }
  
  .device-name {
    margin: 0;
    color: #333;
    font-size: 1.1rem;
  }
  
  .device-status {
    color: #666;
    font-size: 0.9rem;
  }
  
  .details-link {
    text-decoration: none;
    color: #007bff;
    margin-top: 10px;
    display: inline-block;
  }
  
  .details-link:hover {
    text-decoration: underline;
  }
  </style>
  