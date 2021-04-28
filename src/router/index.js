import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import NoActivationMail from '../views/NoActivationMail.vue'
import ForgotUsername from '../views/ForgotUsername.vue'
import Profile from '../views/Profile.vue'
import CreatePasteBin from '../views/CreatePasteBin.vue'
import ChangePassword from '../views/ChangePassword.vue'
import MySetting from '../views/MySetting.vue'
import ChangeProfile from '../views/ChangeProfile.vue'

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
  },
  {
    path:'/u/change-password',
    name:'ChangePassword',
    component:ChangePassword
  },
  
  {
    path:'/u/settings',
    name:'MySetting',
    component:MySetting
  },
  {
    path:'/u/profile',
    name:'ChangeProfile',
    component:ChangeProfile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
