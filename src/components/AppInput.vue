<template>
  
    <div class="flex items-center my-2 ">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:<span v-if="requiredType" class="text-red-600">*</span>
            </h2>
        </div>

        <div class="w-full">
            <input :type="inputType" class="outline-none p-2 bg-gray-700 rounded-md w-full" >
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
        inputType:{
            type:String,
            required:true
        },
        requiredType:{
            type:Boolean,
            
        }

    }
}
</script>

<style>

</style>