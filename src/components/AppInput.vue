<template>
  
    <div class="flex items-center my-2 ">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:<span v-if="requiredType" class="text-red-600">*</span>
            </h2>
        </div>

        <div class="w-full">
            <input @keyup="handleChange" :type="inputType" :disabled='disabled' v-model="inputValue" :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class="outline-none p-2  rounded-md w-full" :placeholder="placeholder ? placeholder : ''" >
            <p class="text-red-400 text-xs ml-5 my-1" v-if="error"> <span v-if="customError">{{customError}}</span> <span v-else>Please fill this fill</span> </p>
        
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
        inputType:{
            type:String,
            required:true
        },
        requiredType:{
            type:Boolean,
            
        },
        placeholder:{
            type:String
        },
        error:{
            type:Boolean,
            default:false
        },
        customError:{
            type:String
            
        },
        value:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            defaut:false
        }

    },

    setup(props,context){
        const inputValue=ref(props.value)
        
        const handleChange=()=>{
            context.emit('InputChange', inputValue.value)
        }

        return {inputValue,handleChange}
    }
}
</script>

<style>

</style>