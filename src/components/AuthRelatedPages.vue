<template>
  <div class="p-2 rounded-md border border-gray-600 w-8/12 md:w-4/12 mt-20">
      <h3>
          Related Pages
      </h3>
      <div class="flex flex-col">

        <button @click="this.$emit('changeSignUp')" v-if='!currentPage' class='bg-gray-500 rounded px-4 py-2 mt-2 font-medium focus:outline-none'>Created New Account?</button>
        <button @click="handleForgotUsername" v-if='currentPage !="username"' class='bg-gray-500 rounded px-4 py-2 mt-2 font-medium focus:outline-none'>Forgot Username?</button>
        <button @click="handleForgotPassword" v-if='currentPage !="password"' class='bg-gray-500 rounded px-4 py-2 mt-2 font-medium focus:outline-none'>Forgot Password?</button>
        <button @click="handleNoActivation" v-if='currentPage !="activate"' class='bg-gray-500 rounded px-4 py-2 mt-2 font-medium focus:outline-none'>No Activation Mail?</button>
      </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props:{
    currentPage:{
      type:String
    }
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