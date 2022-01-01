<template>
    <div class='min-h-screen'>
        <div class="px-5 lg:px-72 py-10 md:py-14" >
            <h2 class="font-medium text-2xl ">
                Forgot Username Page
            </h2>

            <hr :class="!this.$store.getters.getUserPastePrefence.nightMode?'border-gray-200 ':'border-gray-600' " class=" border-2">

            <div class=' rounded-lg p-2 my-2'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 ':'bg-gray-700' " v-if='error'>
            <p class='text-red-400  text-sm my-1' >{{error}} ...<router-link class='text-blue-600' :to="{name:'Auth',params:{signup:true}}">Sign Up</router-link></p>

            </div>

            <div class=' rounded-lg p-2 my-2'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 ':'bg-gray-700' " v-if='success'>
            <p class='text-green-500  text-sm my-1' >An email has been sent to you ... You will find your username in it or you can also reset it from your email </p>

            </div>

            <div v-if="!error && !success" class='flex items-center mt-3 p-1 border border-gray-600'>
                <div class='h-8 w-8 rounded-full mr-2 border-gray-200 border flex justify-center items-center'>
                    <p>i</p>
                </div>
                <p>
                    If you have forgotten your username you can request a reminder via the form below.
                </p>
            </div>

            <!-- Email component goes here -->
            
            <form class="w-full mt-5 md:w-10/12 md:mx-auto" @submit.prevent='handleSubmit' >
            
            <AppEmailComponentVue :captcha_error="captcha_error" @captchaOk='handleCaptchaOk' @EmailKeyUp='handleEmailKeyUp' :requesting="requesting" :error="emailError"/>
            </form>
            

            <!-- related pages goes here -->
            <AuthRelatedPages currentPage='username' />
        </div>
    </div>
</template>

<script>
import AppEmailComponentVue from '../components/AppEmailComponent.vue'
import AuthRelatedPages from '../components/AuthRelatedPages.vue'
import { ref } from '@vue/reactivity'
import handleForgotPassword from '@/composibles/handleForgotPassword'

export default {
    name:'ForgotPassword',
    components:{
        AppEmailComponentVue,
        AuthRelatedPages,
    },
    setup(){
        const email= ref('')
        const emailValue= ref('')
        const emailError=ref(false)
        const requesting=ref(false)
        const success = ref(false)
        const captcha_error=ref(false)
        const captcha_checked=ref(false)
        

      

        const {error, forgotPassword} = handleForgotPassword()

        const handleEmailKeyUp=(user_email)=>{
            email.value=user_email
        }

        const handleSubmit=async(e)=>{
            if(captcha_checked.value){
                captcha_error.value=false
            }else{
                captcha_error.value=true
            }

            if(!email.value.length){
                emailError.value=true
                success.value=false
            }else{
                emailError.value=false
                requesting.value=true
                success.value=false
                error.value=null

                if(!captcha_error.value){

                    const action = await forgotPassword(email.value,'username')
                    success.value=action
                }

                requesting.value=false
                error.value=null
                
            }


            
        }

        const handleCaptchaOk=()=>{
            captcha_checked.value=true
            captcha_error.value=false
        }

        return{
            
            email,
            error,
           
            emailValue,
            success,
            requesting,
            emailError,
            handleEmailKeyUp,
            handleSubmit,
            handleCaptchaOk,
            captcha_error
        }
    }
}
</script>

<style>

</style>