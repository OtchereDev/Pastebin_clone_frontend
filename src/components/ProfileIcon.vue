<template>
    <span class="flex items-center" :class="{'mr-2':!isLast}">
        <div class='flex justify-center items-center mr-1' >
            <ion-icon  :name="iconName" class="text-2xl"></ion-icon>
        </div>
        <div :title="title">{{value}}</div>
    </span>
</template>

<script>
export default {
    props:{
        iconName:{
            type:String,
            required: true
        },
        title:{
            type:String,
            required: true
        },
        isLast:{
            type:Boolean
        },
        value:{
            type:String,
            required: true
        }
    }
}
</script>

<style>

</style>