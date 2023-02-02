import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const handleRequestError = (e) => {

  if (e.response && e.response.data && e.response.data.message)
    return { error: e.response.data.message, status: e.response.status, ...e.response.data };

  if (e.response && e.response.data && e.response.data.errors)
    return { error: e.response.data.errors, status: e.response.status, ...e.response.data };

  if(e.response)
    return { error: 'Something went wrong!', status: e.response.status, ...e.response.data };

  return { error: 'Something went wrong!', status: 503 };
};

// create axiosInstance
const axiosInstance = axios.create({
// set base url
  // baseURL:'http://127.0.0.1/api',
  baseURL:'https://yayornaybackend-bmqgc.ondigitalocean.app/api',
});

// adding interceptors for request
axiosInstance.interceptors.request.use(
  async (config) => {

      const token = await AsyncStorage.getItem('Token');
      if(token){
        // if token found then add it on header
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error)=>{
    // for any request return promise reject with error
    return Promise.reject(handleRequestError(error));
  }
);

axiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  },
  (err)=>{
    return Promise.reject(handleRequestError(err));
  });

export default axiosInstance;