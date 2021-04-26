import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import NoActivationMail from '../views/NoActivationMail.vue'
import ForgotUsername from '../views/ForgotUsername.vue'
import Profile from '../views/Profile.vue'
import CreatePasteBin from '../views/CreatePasteBin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path:'/forgot-password',
    name:'ForgotPassword',
    component:ForgotPassword
  },
  {
    path:'/forgot-username',
    name:'ForgotUsername',
    component:ForgotUsername
  },
  {
    path:'/activation-email',
    name:'NoActivationMail',
    component:NoActivationMail
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile
  },
  {
    path:'/create-pastebin',
    name:'CreatePasteBin',
    component:CreatePasteBin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
