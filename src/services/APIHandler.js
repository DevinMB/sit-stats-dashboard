import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.250:5001'; 
// const API_BASE_URL = 'http://localhost:5001'; 


export default {
  async fetchDeviceStatus() {
    try {
      const response = await axios.get(`${API_BASE_URL}/sit-stats/devices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching device status:', error);
      throw error;
    }
  },

  async fetchSitStatistics() {
    try {
      const response = await axios.get(`${API_BASE_URL}/sit-stats/chair-sensor-1`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sit statistics:', error);
      throw error;
    }
  }
};
