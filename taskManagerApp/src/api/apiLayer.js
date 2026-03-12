import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//centerlized api creation with axios interceptor
const api = axios.create({
  //ngrok url used
  baseURL: 'https://unfeared-rana-prerheumatic.ngrok-free.dev',
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');

  //set token in header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
