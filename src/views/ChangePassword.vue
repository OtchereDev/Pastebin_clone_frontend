<template>
  <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <form @submit.prevent="handleSubmit" class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                Change Password
            </h2>
            <hr class='border-gray-500 '>

            <div class=' rounded-lg p-2 my-2'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-600' " v-if='error.length'>
            <p class='text-red-400  text-sm my-1' v-for="errors,index in error" :key='index'>{{errors}}</p>

            </div>

            <div>
                <div class="flex items-center my-2 ">
                    <div  class="mr-4 w-60">
                        <h2>
                            Password Status:
                        </h2>
                    </div>

                    <div class="w-full">
                        <h2 class="text-green-600">
                            Ok!
                        </h2>
                    </div>

                </div>
                <AppInput @InputChange='handleInputChangeOldPass' :error='old_passError' title="Current Password" inputType='password' :requiredType='true' />
                <AppInput @InputChange='handleInputChangeNewPass' :error='new_passError' title="New Password" inputType='password' :requiredType='true' />
                <AppInput @InputChange='handleInputChangeRePass' :customError='repeatError' :error='re_new_passError' title="New Password Again" inputType='password' :requiredType='true' />
                <AppCaptcha @captchaOk='handleCaptchaOK'/>

            </div>

            <div class="mt-5 flex justify-center items-center">
                <button class='px-4 py-2   rounded' :disabled='requesting'
                :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
                    <span v-if='!requesting' >
                        Change Password
                    </span>
                    <span v-else>
                        Please wait...
                    </span>
                </button>
            </div>

          <AccountRelatedPages/>

      </form>

 

  </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AccountRelatedPages from '@/components/AccountRelatedPages.vue'
import AppCaptcha from '@/components/AppCaptcha'
import { ref } from '@vue/reactivity'
import handleChangePassword from '@/composibles/handleChangePassword'
import {useStore} from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
    components:{
        AppInput,
        AccountRelatedPages,
        AppCaptcha
    },
    setup(){
        const old_pass=ref('')
        const new_pass=ref('')
        const re_new_pass=ref('')
        const old_passError=ref(false)
        const new_passError=ref(false)
        const re_new_passError=ref(false)

        const store = useStore()

        const repeatError=ref(null)

        const requesting=ref(false)

        const {changePassword,error}=handleChangePassword()

        const handleCaptchaOK=()=>{
            console.log('ok')
        }

        const handleInputChangeOldPass=(input_value)=>{
            old_pass.value=input_value
        }

        const handleInputChangeNewPass=(input_value)=>{
            new_pass.value=input_value
        }

        const handleInputChangeRePass=(input_value)=>{
            re_new_pass.value=input_value
        }

        const handleSubmit=async()=>{

            old_passError.value=false
            new_passError.value=false
            re_new_passError.value=false

            if(old_pass.value.length && new_pass.value.length && re_new_pass.value.length){
                if (new_pass.value === re_new_pass.value){
                    await store.dispatch('handleChangeUser')
                    
                    const isUser=computed(()=>{
                        return store.getters.getUser
                    })
                    
                    if(isUser){
                        requesting.value=true
                        await changePassword(old_pass.value,new_pass.value,re_new_pass.value)
                        requesting.value=false
                    }
                }else{
                    re_new_passError.value=true
                    repeatError.value='please make sure both passwords are the same'
                }
            }else{
                if(!old_pass.value.length){
                    old_passError.value=true
                }

                if(!new_pass.value.length){
                    new_passError.value=true
                }

                if(!re_new_pass.value.length){
                    re_new_passError.value=true
                }
            }
        }

        return {handleCaptchaOK,handleInputChangeOldPass,
                handleInputChangeNewPass,
                handleInputChangeRePass,
                handleSubmit,
                old_passError,
                new_passError,
                re_new_passError,
                repeatError,
                error,
                requesting}
    }
}
</script>

<style>

</style>