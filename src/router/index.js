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
import CodePasteDetail from '../views/CodePasteDetail.vue'
import ResetPassword from '../views/ResetPassword.vue'

import store from '@/store'

const requireAuth=async(to,from,next)=>{

    await store.dispatch('handleChangeUser')

    const user= store.getters.getUser

    if(user===null){
      return next({name:'Auth'})
    }else{
      return next()
    }
}

const requireNoAuth=async(to, from, next)=>{
    await store.dispatch('handleChangeUser')

    const user= store.getters.getUser

    if(user!==null){
      return next({name:'Home'})
    }else{
      return next()
    }
}

const performNoAuth=async(to, from, next)=>{
  await store.dispatch('handleChangeUser')

  const user= store.getters.getUser

  return next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CreatePasteBin,
    beforeEnter:performNoAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter:requireNoAuth
  },
  {
    path:'/forgot-password',
    name:'ForgotPassword',
    component:ForgotPassword,
    beforeEnter:requireNoAuth
  },
  {
    path:'/reset/:field/:uid/:token',
    name:'ResetPassword',
    component:ResetPassword,
    props:true,
    beforeEnter:requireNoAuth
  },
  {
    path:'/forgot-username',
    name:'ForgotUsername',
    component:ForgotUsername,
    beforeEnter:requireNoAuth
  },
  {
    path:'/activation-email',
    name:'NoActivationMail',
    component:NoActivationMail,
    beforeEnter:requireNoAuth
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile,
    beforeEnter:requireAuth
  },
  {
    path:'/create-pastebin',
    name:'CreatePasteBin',
    component:CreatePasteBin
  },
  {
    path:'/u/change-password',
    name:'ChangePassword',
    component:ChangePassword,
    beforeEnter:requireAuth
  },
  
  {
    path:'/u/settings',
    name:'MySetting',
    component:MySetting,
    beforeEnter:requireAuth
  },
  {
    path:'/u/profile',
    name:'ChangeProfile',
    component:ChangeProfile,
    beforeEnter:requireAuth
  },
  ,
  {
    path:'/paste/:uuid',
    name:'CodePasteDetail',
    component:CodePasteDetail,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
