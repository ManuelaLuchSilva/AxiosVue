import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTE4OC4xNzYsInN1YiI6IjY3M2I3Mjg0NDQzNTQzMTkxY2NjMzExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYX2Cey5pPSMJP0PPqocYyvHkN6H39ip9B7Hd5ELskk`,
  },
});

export default api;
