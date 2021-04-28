<template>
  <button   class='bg-gray-500 rounded px-4 py-2 mt-2 font-medium focus:outline-none'>{{title}}</button>
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