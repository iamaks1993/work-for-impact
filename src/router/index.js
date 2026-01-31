import { createRouter, createWebHistory } from 'vue-router'
import UsersListView from '@/views/users/UsersListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users-list',
      component: UsersListView,
    },
  ],
})

export default router
