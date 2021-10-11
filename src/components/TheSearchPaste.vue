<template>
    <div class="w-2/12 hidden md:flex items-center">
        <div>
            <ion-icon name="search-outline" class="text-2xl"></ion-icon>
        </div>
        <div>
            <input type="text" name="" placeholder="Search" class="p-2  rounded-md"
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-600' " id="">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>