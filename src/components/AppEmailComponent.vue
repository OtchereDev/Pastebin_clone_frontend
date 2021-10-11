<template>
    
        
        <div class="">
            <label class="block  mr-5" for="">Email <span class="hidden md:inline">Address</span>:<span class="text-red-500">*</span></label>
            <input v-model="email" @keyup="handleKeyUp" :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class="block w-full mt-2 p-2  rounded-lg outline-none" placeholder="Your email address" type="email" name="email" id="email">
            <p class="text-sm text-red-500" v-if="error">This field must be field</p>
        </div>
        <AppCaptcha @captchaOk='handleCaptchaOk' :captcha_error='captcha_error' />
        <div class="mt-5 flex justify-center items-center">
            <button :disabled='requesting' class='px-4 py-2   rounded' :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
                <span v-if='!requesting'>Submit</span><span v-else>Please wait</span>
            </button>
        </div>
   
</template>

<script>
import {ref} from 'vue'
import AppCaptcha from '@/components/AppCaptcha.vue'
export default {
     components:{
        AppCaptcha
     },
     props:{
         error:{
             type:Boolean,
             default:false
         },
         requesting:{
             type:Boolean,
             default:false
         },
         captcha_error:{
             type:Boolean,
             default:false
         }
     },
     emits:['EmailKeyUp','captchaOk']
     ,
     setup(props,context){
         const email = ref('')

         const handleKeyUp=()=>{
             context.emit('EmailKeyUp',email.value)
         }

         const handleCaptchaOk=()=>{
             context.emit('captchaOk')
         }

    


         return {email,handleKeyUp,handleCaptchaOk}
     }
}
</script>

<style>

</style>