// webSocketService.js

import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import store from '../store/index.js'; 

let stompClient = null;

const handleDeviceUpdate = (deviceStatus) => {
    // Update the Vuex store with the new device status
    const status = typeof deviceStatus === 'string' ? JSON.parse(deviceStatus) : deviceStatus;
    store.dispatch('updateDeviceStatus', status);
};

const onConnectedCallback = () => {
    // Subscribe to the topic
    stompClient.subscribe('/topic/status', message => {
        const data = typeof message.body === 'string' ? JSON.parse(message.body) : message.body;

        if (Array.isArray(data)) {
            // If the data is an array, it's the initial list of devices
            store.dispatch('updateDeviceStatus', data);
        } else {
            // If the data is not an array, it's a single device update
            handleDeviceUpdate(data);
        }
    });

    // Send an empty message to trigger the broadcastStatus method in the backend
    stompClient.send('/app/status', {}, '{}');
};

const connect = () => {
    const socket = new SockJS('http://192.168.1.34:5001/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        onConnectedCallback(); // This is called only after the connection is established
    }, error => {
        console.error('Connection error: ' + error);
    });
};

export default {
    connect
};
