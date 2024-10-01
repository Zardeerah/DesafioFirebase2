import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SingUpView from '../views/SingUpView.vue'
import {getAuth} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
  
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
       guest: true
      }
    },
    {
      
      path: '/singup',
      name: 'singup',
      component: SingUpView,
      meta: {
        guest: true
      }
      

    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }

} )

export default router
