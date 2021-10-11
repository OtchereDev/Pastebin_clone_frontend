<template>
  <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <form @submit.prevent="handleSubmit" class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                Reset {{field_type}}
            </h2>
            <hr class='border-gray-500 '>

            <div class='bg-gray-700 rounded-lg p-2 my-2' v-if='error.length'>
            <p class='text-red-400  text-sm my-1' v-for="errors,index in error" :key='index'>{{errors}}</p>

            </div>

            <div>
                
                <AppInput @InputChange='handleInputChangeNewPass' :error='new_passError' :title="`New ${field_type}`" :inputType=' field =="password" ? "password" : "text"'  :requiredType='true' />
                <AppInput @InputChange='handleInputChangeRePass' v-if="field==='password'" :customError='repeatError' :error='re_new_passError' title="New Password Again" inputType='password' :requiredType='true' />
                <AppCaptcha @captchaOk='handleCaptchaOK'/>

            </div>

            <div class="mt-5 flex justify-center items-center">
                <button class='px-4 py-2 bg-gray-700  rounded' :disabled='requesting'>
                    <span v-if='!requesting' >
                        Reset {{field_type}}
                    </span>
                    <span v-else>
                        Please wait...
                    </span>
                </button>
            </div>

          <AuthRelatedPages/>

      </form>

 

  </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AuthRelatedPages from '@/components/AuthRelatedPages.vue'
import AppCaptcha from '@/components/AppCaptcha'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import handleResetPassword from '@/composibles/handlePasswordReset'

export default {
    components:{
        AppInput,
        AuthRelatedPages,
        AppCaptcha
    },
    props:{
        uid:{
            type:String
        },
        token:{
            type:String
        },
        field:{
            type:String
        }
    },
    setup({uid,token,field}){
        
        const new_pass=ref('')
        const re_new_pass=ref('')

        const field_type=field[0].toUpperCase() + field.slice(1,field.length)

        const router=useRouter()
        
        
        const new_passError=ref(false)
        const re_new_passError=ref(false)

        const repeatError=ref(null)

        const requesting=ref(false)

        const {resetPassword,error}=handleResetPassword()

        const handleCaptchaOK=()=>{
            console.log('ok')
        }

        const handleInputChangeNewPass=(input_value)=>{
            new_pass.value=input_value
        }

        const handleInputChangeRePass=(input_value)=>{
            re_new_pass.value=input_value
        }

        const handleSubmit=async()=>{

          
            new_passError.value=false
            re_new_passError.value=false

            // console.log('here',field)
            if(field==='username'){
                if(new_pass.value.length){
                    requesting.value=true
                    await resetPassword(token,uid,new_pass.value,'username')
                    requesting.value=false

                    if(error.value==null){
                        router.push('/auth')
                    }
                }else{
                    new_passError.value=true
                }

            }else if(field==='password'){
                
                if( new_pass.value.length && re_new_pass.value.length){
                    if (new_pass.value === re_new_pass.value){
                       
                        
                     
                            requesting.value=true
                            await resetPassword(token,uid,new_pass.value)
                            requesting.value=false
    
                            if(error.value==null){
                                router.push('/auth')
                            }
                       
                    }else{
                        re_new_passError.value=true
                        repeatError.value='please make sure both passwords are the same'
                    }
                }else{
                    
    
                    if(!new_pass.value.length){
                        new_passError.value=true
                    }
    
                    if(!re_new_pass.value.length){
                        re_new_passError.value=true
                    }
                }

            }else{
                error.value.push='Sorry can not perform this action'
            }

        }

        return {handleCaptchaOK,
                handleInputChangeNewPass,
                handleInputChangeRePass,
                handleSubmit,
                field_type,
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