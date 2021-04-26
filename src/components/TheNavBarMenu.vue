<template>
    <div class="absolute top-full mt-2 rounded-md  w-48 right-0 bg-gray-700 overflow-hidden" @mouseleave="this.$emit('closeMenu')" :class="{hidden:!toggleMenu}">
      
        <TheNavBarMenuItem iconName='eye' buttonMessage='My Pastebins' />
        <TheNavBarMenuItem iconName='eye' buttonMessage='Edit Profile' />
        <TheNavBarMenuItem iconName='eye' buttonMessage='Edit Settings' />
        <TheNavBarMenuItem iconName='eye' buttonMessage='Change Password' />
        <TheNavBarMenuItem iconName='eye' buttonMessage='Logout' />
       
    </div>
</template>

<script>
import TheNavBarMenuItem from '@/components/TheNavBarMenuItem'
export default {
    components:{
        TheNavBarMenuItem
    },
    props:{
        toggleMenu:{
            type:Boolean
        }
    }
}
</script>

<style>

</style>