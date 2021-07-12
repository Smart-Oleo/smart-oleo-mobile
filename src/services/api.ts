import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartoleodeploy.smartoleo.net/api/',
});

export default api;
