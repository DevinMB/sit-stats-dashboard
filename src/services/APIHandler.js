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
  }, 

 

  async getDeviceSummaryStats(deviceId, startTimestamp, endTimestamp, minDuration, maxDuration, minAvgValue, maxAvgValue) {
      try {
          const params = {
              startTimestamp,
              endTimestamp,
              minDuration,
              maxDuration,
              minAvgValue,
              maxAvgValue
          };
  
          // Filter out undefined parameters
          Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
  
          const response = await axios.get(`${API_BASE_URL}/sit-stats/${deviceId}`, { params });
          return response.data;
      } catch (error) {
          console.error('Error fetching device stats:', error.message);
          throw error;
      }
  }, 

  async getDeviceListing(){
    try {
        const response = await axios.get(`${API_BASE_URL}/sit-stats/devices`);
        return response.data;
      } catch (error) {
        console.error('Error fetching device status:', error);
        throw error;
      }
  }, 

  async getDeviceStatus(deviceId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/sit-stats/${deviceId}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching device status:', error.message);
        throw error;
    }
},

async getDeviceSits(deviceId, startTimestamp, endTimestamp, minDuration, maxDuration, minAvgValue, maxAvgValue) {
    try {
        const params = {
            startTimestamp,
            endTimestamp,
            minDuration,
            maxDuration,
            minAvgValue,
            maxAvgValue
        };

        // Filter out undefined parameters
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        const response = await axios.get(`${API_BASE_URL}/sit-stats/${deviceId}/sits`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching device sits:', error.message);
        throw error;
    }
}
  
//   // Usage example
//   getDeviceStats('12345', null, null, null, null, null, null)
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
  
// // Usage Examples
// getDeviceStatus('12345')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

// getDeviceSits('12345', null, null, null, null, null, null)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));



};
