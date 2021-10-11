<template>
  <div class='min-h-screen'>
      <div class="px-5 lg:px-72 py-10 md:py-14" v-if="!signup">
          <h2 class="font-medium text-2xl ">
              Login Page
          </h2>

          <hr :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-600' " class=" border-2">

          <!-- Sign In Form component goes here -->
          <AppLogInForm/>

          <p class="text-center mt-5">
              Do not Have An Account? <span class="text-blue-400 cursor-pointer" @click="signup=true">Sign Up</span>
          </p>

          <!-- related pages goes here -->
          <AuthRelatedPages @changeSignUp='handlechangeSignUp' />
      </div>

      <div class="px-5 lg:px-72 py-10 md:py-14" v-else>
          <h2 class="font-medium text-2xl ">
              Sign Up Page
          </h2>

          <hr :class="!this.$store.getters.getUserPastePrefence.nightMode?'border-gray-300 ':'border-gray-600' " class=" border-2">

          <!-- Sign Up Form component goes here -->
          <AppSignUpForm/>

          <p class="text-center mt-5">
              Already Have An Account? <span class="text-blue-400 cursor-pointer" @click="signup=false">Log In</span>
          </p>

          <!-- related pages goes here -->
          <AuthRelatedPages @changeSignUp='handlechangeSignUp' />
      </div>
      
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import AppLogInForm from '../components/AppLogInForm.vue'
import AppSignUpForm from '../components/AppSignUpForm.vue'
import AuthRelatedPages from '../components/AuthRelatedPages.vue'


export default {
    name:'Auth',
    components:{
        AppLogInForm,
        AuthRelatedPages,
        AppSignUpForm
    },
    setup(){
        const route =useRoute()

        const signup=ref(false)
        if(route.params.signup=='true'){
            signup.value=true
        }

        const handlechangeSignUp=()=>{
            signup.value=true
        }

        return {signup,handlechangeSignUp}
    }
}
</script>

<style>

</style>