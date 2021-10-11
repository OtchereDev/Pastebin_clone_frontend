<template>
    <div class="flex items-center my-2">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:
            </h2>
        </div>
        <div class="w-full">
            <div>

                <input type="checkbox" v-model='passwordOn' @click='changeEnablePassword'   class="p-2 mr-2 ">
                <label v-if="!enablePassword" class="text-lg text-red-500">Disabled</label>
                <label v-else class="text-lg text-green-700">Enabled</label>
            </div>
            <input placeholder="Enter paste password" :disabled='!enablePassword' type="text" v-model="password" @keyup="handleInputChange"
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class="outline-none rounded-md p-2  w-full">
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        passwordOn:{
            type:Boolean,
            default:false
        },
        passwordValue:{
            type:String,
            default:''
        }
    },
    setup(props,context){
        const enablePassword=ref(props.passwordOn)
        const password=ref(props.passwordValue)

        

        const changeEnablePassword=()=>{
            enablePassword.value=!enablePassword.value
            if(enablePassword.value){
                password.value='abcd'
                context.emit('passwordChange',password.value)
            }else{
                password.value=''
                context.emit('passwordChange',password.value)

            }
        }

        const handleInputChange=()=>{
            context.emit('passwordChange',password.value)
        }

        return {handleInputChange,enablePassword,password,changeEnablePassword}
    }
}
</script>

<style>

</style>