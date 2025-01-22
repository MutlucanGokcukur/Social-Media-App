import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import MessagesView from '@/views/MessagesView.vue'
import SearchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path     : '/',
      name     : '',
      component: HomeView,
    },
    {
      path     : '/signup',
      name     : 'Signup',
      component: SignupView,
    },
    {
      path     : '/login',
      name     : 'Login',
      component: LoginView,
    },
    {
      path     : '/feed',
      name     : 'Feed',
      component: FeedView,
      meta: { requiresAuth: true },
    },
    {
      path     : '/messages',
      name     : 'Messages',
      component: MessagesView,
      meta: { requiresAuth: true },
    },
    {
      path     : '/search',
      name     : 'Search',
      component: SearchView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.user.isAuthenticated && (to.name === 'Login' || to.name === 'Signup')) 
  {
      next({ name: 'Feed' });
  } 
  else if (to.meta.requiresAuth && !userStore.user.isAuthenticated) 
  {
      next({ name: 'Login' });
  }
  else 
  {
      next();
  }
});

export default router
