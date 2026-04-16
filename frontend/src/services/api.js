import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getUserProfile = () => API.get('/auth/profile');
export const updatePreferences = (data) => API.put('/auth/preferences', data);

// News
export const fetchNews = () => API.post('/news/fetch');
export const getAllNews = (params) => API.get('/news', { params });
export const getNewsById = (id) => API.get(`/news/${id}`);
export const createNews = (data) => API.post('/news', data);
export const updateNews = (id, data) => API.put(`/news/${id}`, data);
export const deleteNews = (id) => API.delete(`/news/${id}`);
export const toggleBookmark = (id) => API.post(`/news/${id}/bookmark`);
export const getBookmarks = () => API.get('/news/bookmarks');

export default API;
