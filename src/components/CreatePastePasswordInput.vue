<template>
    <div class="flex items-center my-2">
        <div  class="mr-4 w-60">
            <h2>
                {{title}}:
            </h2>
        </div>
        <div class="w-full">
            <div>

                <input type="checkbox"  class="p-2 mr-2 bg-gray-600">
                <label v-if="true" class="text-lg">Disabled</label>
                <label v-else class="text-lg">Enabled</label>
            </div>
            <input type="text" class="outline-none rounded-md p-2 bg-gray-700 w-full">
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