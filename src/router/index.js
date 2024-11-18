import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'filmes',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('../views/TvView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;