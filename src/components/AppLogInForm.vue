<template>
  <form class="w-full mt-5 md:w-10/12 md:mx-auto" @submit.prevent='handleSubmit'>
      <AppInput title="Username" @InputChange='handleUsernameInput' :error='usernameError' :value='username' inputType='text' :requiredType='true' placeholder="Your username" />
      <AppInput title="Password" @InputChange='handlePasswordInput' :error='passwordError' :value='password' inputType='password' :requiredType='true' placeholder="Your password" />
      <p v-if='error' class='text-red-400 text-center text-sm mt-2 '>{{error}}</p>
      <div class="mt-5 flex justify-center items-center">
          <button :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class='px-4 py-2  rounded focus:outline-none' :disabled='requesting' >
              <span v-if='!requesting' >
                  Login
              </span>
              <span v-else>
                  Please wait...
              </span>
          </button>
      </div>
      
  </form>
</template>

<script>
import handleLogin from '@/composibles/handleLogin'
import AppInput from '@/components/AppInput.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    components:{AppInput},
    setup(props,context){
        const router= useRouter()
        const username=ref('')
        const password=ref('')
        const usernameError=ref(false)
        const passwordError=ref(false)
        const requesting=ref(false)

        const {login,error}=handleLogin()

        const handleUsernameInput=(value)=>{
            username.value=value
        }

        const handlePasswordInput=(value)=>{
            password.value=value
        }

        const handleSubmit=async()=>{
            usernameError.value=false
            passwordError.value=false
            requesting.value=true
            

            if(username.value.length && password.value.length){
               await login(username.value,password.value)
                requesting.value=false

               if(!error.value){
                context.emit('Auth')

                router.push('/')
                
               }
               
                // console.log('done',username.value,password.value)
            }
            else{
                requesting.value=false

                if(!username.value.length){
                    usernameError.value=true
                }
                if(!password.value.length){
                    passwordError.value=true
                }
            }
          

        }

        return {handleSubmit, username, password,handleUsernameInput,handlePasswordInput,usernameError,passwordError,error,requesting}
        }
}
</script>

<style>

</style>