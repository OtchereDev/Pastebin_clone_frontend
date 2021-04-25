<template>
  <div class='min-h-screen'>
      <div class="px-5 lg:px-72 py-10 md:py-14" v-if="false">
          <h2 class="font-medium text-2xl ">
              Login Page
          </h2>

          <hr class="border-gray-600 border-2">

          <!-- Sign In Form component goes here -->
          <AppLogInForm/>

          <!-- related pages goes here -->
          <AuthRelatedPages/>
      </div>

      <div class="px-5 lg:px-72 py-10 md:py-14" v-else>
          <h2 class="font-medium text-2xl ">
              Sign Up Page
          </h2>

          <hr class="border-gray-600 border-2">

          <!-- Sign Up Form component goes here -->
          <AppSignUpForm/>

          <!-- related pages goes here -->
          <AuthRelatedPages/>
      </div>
      
  </div>
</template>

<script>
import AppLogInForm from '../components/AppLogInForm.vue'
import AppSignUpForm from '../components/AppSignUpForm.vue'
import AuthRelatedPages from '../components/AuthRelatedPages.vue'

export default {
    name:'Auth',
    components:{
        AppLogInForm,
        AuthRelatedPages,
        AppSignUpForm
    }
}
</script>

<style>

</style>