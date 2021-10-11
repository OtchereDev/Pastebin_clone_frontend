<template>
    <div class="flex justify-between items-center p-2 cursor-pointer " :class="this.$store.getters.getUserPastePrefence? 'hover:bg-gray-300' : 'hover:bg-gray-500' ">
        <div class='flex justify-center items-center' >
        <ion-icon  :name="iconName" class="text-2xl"></ion-icon>
        </div>
        <p>
            {{buttonMessage}}
        </p>
    </div>
</template>

<script>
export default {
    props:{
        iconName:{
            type:String,
            required:true
        },
        buttonMessage:{
            type:String,
            required:true
        }
    }
}
</script>

<style>

</style>