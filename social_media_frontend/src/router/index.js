import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import MessagesView from '@/views/MessagesView.vue'
import SearchView from '@/views/SearchView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //#region Home Route
    {
      path     : '/',
      name     : '',
      component: HomeView,
    },
    //#endregion
    //#region Signup Route
    {
      path     : '/signup',
      name     : 'Signup',
      component: SignupView,
    },
    //#endregion
    //#region Login Route
    {
      path     : '/login',
      name     : 'Login',
      component: LoginView,
    },
    //#endregion
    //#region Feed Route
    {
      path     : '/feed',
      name     : 'Feed',
      component: FeedView,
      meta: { requiresAuth: true },
    },
    //#endregion
    //#region Messages Route
    {
      path     : '/messages',
      name     : 'Messages',
      component: MessagesView,
      meta: { requiresAuth: true },
    },
    // #endregion
    //#region Search Route
    {
      path     : '/search',
      name     : 'Search',
      component: SearchView,
      meta: { requiresAuth: true },
    },
    //#endregion
    //#region Profile Route
    {
      path     : '/profile/:id',
      name     : 'Profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    //#endregion
  ],
});

router.beforeEach((to, from, next) => 
{
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
