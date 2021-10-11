<template>
  <button :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-500' "   class=' rounded px-4 py-2 mt-2 font-medium focus:outline-none'>{{title}}</button>
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