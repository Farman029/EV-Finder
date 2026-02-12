// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Connects to your Backend
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;



// import axios from 'axios';

// // Create an axios instance
// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // Add a request interceptor
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('token')) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   }
//   return req;
// });

// export default API;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ADD THIS INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;