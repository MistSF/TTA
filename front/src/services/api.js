import axios from 'axios';

const API_URL = 'https://tta-back.onrender.com';

const api = axios.create({
  baseURL: API_URL
});

// Intercepteur pour ajouter la clé d'API à chaque requête
api.interceptors.request.use(config => {
  // Remplacez 'VOTRE_CLE_API_SECRETE' par la clé que vous avez définie côté backend
  config.headers['X-API-KEY'] = process.env.REACT_APP_API_KEY;
  return config;
});

export default api;