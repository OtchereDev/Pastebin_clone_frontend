<template>
    <div class="flex items-center my-2">
        <div  class="mr-4 ">
            <h2>
                {{title}}:
            </h2>
        </div>
        <div>
            <select class="outline-none p-2 bg-gray-700 rounded-md">
                
                <option v-for="lang,index in selectOption" :key='index' :value="lang" >{{lang[0].toUpperCase()+lang.slice(1,lang.length)}}</option>
                
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        selectOption:{
            type:Array,
            required:true
        }
    }
}
</script>

<style>
    select{
        perspective: none;
    }
</style>