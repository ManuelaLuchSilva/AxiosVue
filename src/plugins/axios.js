import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTg2My4xMzQ4NDU3LCJzdWIiOiI2NzNiNzI4NDQ0MzU0MzE5MWNjYzMxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Qq_7Hjfrz1ljKAvP4PzUAFZOehldSXi6HSUOxetTelo`,
  },
});

export default api;