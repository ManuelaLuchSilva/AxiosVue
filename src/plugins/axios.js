import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer c6bd8220734e1f50ebdb4d9a66391d21`,
  },
});

export default api;
