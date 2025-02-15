// // src/services/api.ts
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // Request interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/employee/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   employeeLogin: (data: { email: string; password: string }) =>
//     api.post('/employees/login', data),
//   adminLogin: (data: { email: string; password: string }) =>
//     api.post('/admin/login', data),
// };

// export const visitorAPI = {
//   register: (data: any) => api.post('/visitors/register', data),
//   createVisitRequest: (data: any) => api.post('/visits/request', data),
//   getVisitStatus: (id: number) => api.get(`/visits/${id}`),
// };

// export const employeeAPI = {
//   getVisits: () => api.get('/visits'),
//   approveVisit: (visitId: number) => api.put(`/visits/${visitId}/approve`),
//   denyVisit: (visitId: number) => api.put(`/visits/${visitId}/deny`),
//   createEvent: (data: any) => api.post('/events/create', data),
//   getEvents: () => api.get('/events'),
// };

// export default api;

// src/services/api.ts
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // Add token to all requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle unauthorized responses
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear storage and redirect to login
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response); // Add this for debugging
    return Promise.reject(error);
  }
);

export default api;