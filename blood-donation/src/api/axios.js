// // src/api/axios.js
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export default axiosInstance;


// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // matches /api/auth/login etc.
  headers: {
    'Content-Type': 'application/json',
  },
  // Remove withCredentials for now
  // withCredentials: true, // if you plan to send cookies
});

export default axiosInstance;
