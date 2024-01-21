<template>
    <div class="error-message">
      <span>{{ message }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorComponent',
    props: {
      message: String
    }
  };
  </script>
  
  <style>
  .error-message {
    color: red;
  }
  </style>
  