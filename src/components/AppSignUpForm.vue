<template>
    <form class="w-full mt-5 md:w-10/12 md:mx-auto" @submit.prevent='handleSubmit'>

        <div class=' rounded-lg p-2'
        :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 ':'bg-gray-700' " v-if='error.length'>
            <p class='text-red-400  text-sm my-1' v-for="errors,index in error" :key='index'>{{errors}}</p>

        </div>
      <AppInput title="Username" @InputChange='handleUsernameInput' :error='usernameError'  inputType='text' :requiredType='true' placeholder="Your username" />
      <AppInput title="Email" @InputChange='handleEmailInput' :error='emailError'  inputType='email' :requiredType='true' placeholder="Your email" />
      <AppInput title="Password" @InputChange='handlePasswordInput' :error='passwordError'  inputType='password' :requiredType='true' placeholder="Your password" />
      
      <!-- TODO: DONE -->
      <!-- Added a reCAPTHA to sign up process -->
      <AppCaptcha/>
      
      

      <div class="mt-5 flex justify-center items-center">
          <button :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class='px-4 py-2  rounded focus:outline-none' :disabled='requesting'>
              <span v-if='!requesting' >
                  Create My Account
              </span>
              <span v-else>
                  Please wait...
              </span>
          </button>
      </div>
  </form>
</template>

<script>
import AppCaptcha from '@/components/AppCaptcha.vue'
import AppInput from '@/components/AppInput.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

import handleSignUp from '@/composibles/handleSignUp'

export default {
    components:{
        AppCaptcha,
        AppInput
    },

    setup(props,context){
        const router= useRouter()
        const username=ref('')
        const email=ref('')
        const password=ref('')
        const usernameError=ref(false)
        const emailError=ref(false)
        const passwordError=ref(false)
        const requesting=ref(false)

        const {signup,error}=handleSignUp()

        

        const handleUsernameInput=(value)=>{
            username.value=value
        }

        const handleEmailInput=(value)=>{
            email.value=value
        }

        const handlePasswordInput=(value)=>{
            password.value=value
        }

        const handleSubmit=async()=>{
            usernameError.value=false
            emailError.value=false
            passwordError.value=false

            requesting.value=true
            

            if(username.value.length && password.value.length,email.value.length){
               await signup(username.value,password.value,email.value)
                requesting.value=false

               if(!error.value.length){
                context.emit('Auth')
                router.push('/')
                
               }

            }
            else{
                requesting.value=false

                if(!username.value.length){
                    usernameError.value=true
                }
                if(!password.value.length){
                    passwordError.value=true
                }
                if(!email.value.length){
                    emailError.value=true
                }
            }
          

        }

        return {username,
                email,
                password,
                requesting,
                error,
                usernameError,
                emailError,
                passwordError,
                handleUsernameInput,
                handleEmailInput,
                handlePasswordInput,
                handleSubmit}

    }
    
}
</script>

<style>

</style>