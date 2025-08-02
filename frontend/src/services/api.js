// src/services/api.js
import axios from 'axios';

// wszystkie żądania /api/... pójdą na proxy Vite
const api = axios.create({
  baseURL: '/api',
});

export default api;
