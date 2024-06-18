import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import Users from './views/UsersView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users/:id',
    name: 'Users',
    component: Users,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;