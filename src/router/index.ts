import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
// import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PublicProfile from '../views/PublicProfile.vue'
import Admin from '../views/Admin.vue'
// import MainLogin from '@/components/MainLogin.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  // },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // meta: { requiresAuth: true }
  },
  {
    path: '/user/:username',
    name: 'user',
    component: PublicProfile,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
