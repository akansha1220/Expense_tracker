import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.226.31:3000/api/v1', // Replace with your backend URL
});

// Add JWT token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors
API.interceptors.response.use(
  (response) => response, // If response is successful, simply return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the status code is 401, redirect to the login page
      window.location.href = '/login';
    }
    // Otherwise, reject the promise with the error
    return Promise.reject(error);
  }
);

export default API;
