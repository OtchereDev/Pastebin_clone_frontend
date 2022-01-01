<template>
    <div class="flex items-center my-2 ">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:
            </h2>
        </div>
        <div class="w-full">
            <select @change="handleChange" :value="value" :disabled='disabled' v-model="value" :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' " class="outline-none p-2  rounded-md w-full">
                
                <option v-for="lang,index in selectOption" :key='index' :value="lang" >{{lang[0].toUpperCase()+lang.slice(1,lang.length)}}</option>
                
            </select>
        <input type="text" v-model="folderName" v-if="folder" @keyup="handleInputChange"  class="outline-none p-2 my-2 w-full bg-gray-700 rounded-md " placeholder="Enter your folder name" >

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
        selectOption:{
            type:Array,
            required:true
        },
        value:{
            type:String
        },
        folder:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    setup(props,context){
        const folderName=ref('')
        const handleInputChange=()=>{
            context.emit('inputChange',folderName.value)

        }

        const handleChange=()=>{
            context.emit('selectChange',props.value)
        }
        return {handleChange,folderName,handleInputChange}
    }
}
</script>

<style>
    select{
        perspective: none;
    }
</style>