<template>
  <div id="app">
    <header>
      <h1>Device Dashboard</h1>
      <!-- Additional navigation or header content goes here -->
    </header>

    <main>
      <DeviceGrid />
      
    </main>

    <footer>
      <p>&copy; Devin's Bad Device Dashboard</p>
      <!-- Additional footer content goes here -->
    </footer>
  </div>
</template>

<script>
import DeviceGrid from './components/DeviceGrid.vue';
import webSocketService from './services/WebsocketHandler.js';


export default {
  name: 'App',
  components: {
    DeviceGrid
  },
  mounted() {
    webSocketService.connect();
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background-color: #f5f5f5;
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
}

main {
  flex: 1; /* Allows main to grow and take up available space */
  padding: 20px;
}

footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  border-top: 1px solid #eaeaea;


}
</style>
