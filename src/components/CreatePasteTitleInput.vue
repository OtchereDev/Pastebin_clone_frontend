<template>
    <div class="flex items-center my-2">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:
            </h2>
        </div>
        <div class="w-full">
            <input type="text"  class="outline-none rounded-md p-2 bg-gray-700 w-full">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        }
    }
}
</script>

<style>

</style>