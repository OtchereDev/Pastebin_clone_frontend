<template>
  <div class="p-2 rounded-md border border-gray-600 w-8/12 md:w-4/12 mt-20">
      <h3>
          Related Pages
      </h3>
      <div class="flex flex-col">
        
        <AppBaseBtn @click="this.$emit('changeSignUp')" v-if='!currentPage' title="Created New Account?" />
        <AppBaseBtn @click="handleForgotUsername" v-if='currentPage !="username"' title="Forgot Username?" />
        <AppBaseBtn @click="handleForgotPassword" v-if='currentPage !="password"' title="Forgot Password?" />
       
        
      </div>
  </div>
</template>

<script>
import AppBaseBtn from '@/components/AppBaseBtn.vue'
import { useRouter } from 'vue-router'
export default {
  props:{
    currentPage:{
      type:String
    }
  },
  components:{
    AppBaseBtn
  },
  setup(){
    const router =useRouter()

    const handleForgotPassword=()=>{
            router.push({
                name:'ForgotPassword',
             
            })
        }


    const handleForgotUsername=()=>{
            router.push({
                name:'ForgotUsername',
              
            })
        }


    const handleNoActivation=()=>{
            router.push({
                name:'NoActivationMail',
              
            })
        }



    return {handleForgotPassword,
            handleForgotUsername,
            handleNoActivation}
  }
}
</script>

<style>

</style>