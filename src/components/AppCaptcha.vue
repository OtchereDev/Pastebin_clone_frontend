<template>
    <div class="flex items-center my-2 ">
        <div  class="mr-4 w-60">
            <h2>
                Are you a human being:<span class="text-red-500">*</span>
            </h2>
        </div>

        <div class="w-full">
            
            <myCaptcha class='text-black' resolve="text" mode='text' captchaBg='beige' :callSuccess="captchaOk" />
            <p class="text-red-400 text-xs ml-5 my-1" v-if="captcha_error" > Please the captcha is required </p>
        </div>

    </div>
</template>

<script>
import myCaptcha from 'vue-captcha'

export default {
    components:{
        myCaptcha
    },
    props:{
        captcha_error:{
            type:Boolean,
            default:false
        }
    },
    emits:['captchaOk'],
    setup(props,context){
        const captchaOk=()=>{
            
            context.emit('captchaOk')
        }

        return {captchaOk}
    }
}
</script>

<style>

</style>