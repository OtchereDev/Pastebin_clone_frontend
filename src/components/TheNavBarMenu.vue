<template>
    <div :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' ,{hidden:!toggleMenu}" class="absolute top-full mt-2 rounded-md z-50  w-48 right-0  overflow-hidden " @mouseleave="this.$emit('closeMenu')" >
      
        <TheNavBarMenuItem @click='handlePaste' iconName='clipboard' buttonMessage='My Pastebins' />
        <TheNavBarMenuItem @click="handleProfile" iconName='person-circle-outline' buttonMessage='Edit Profile' />
        <TheNavBarMenuItem @click="handleSettings" iconName='cog' buttonMessage='Edit Settings' />
        <TheNavBarMenuItem @click="handlePassword" iconName='key-outline' buttonMessage='Change Password' />
        <TheNavBarMenuItem @click='handleLogout' iconName='log-out-outline' buttonMessage='Logout' />
       
    </div>
</template>

<script>
import TheNavBarMenuItem from '@/components/TheNavBarMenuItem'
import {useRouter} from 'vue-router'
import logout from '@/composibles/handleLogout'
export default {
    components:{
        TheNavBarMenuItem
    },
    props:{
        toggleMenu:{
            type:Boolean
        }
    },
    setup(){
        const router = useRouter()

        const handleProfile=()=>{
            
            router.push({
                name:'ChangeProfile'
            })
        }

        const handleSettings=()=>{
             router.push({
                name:'MySetting'
            })
        }

        const handlePassword=()=>{
             router.push({
                name:'ChangePassword'
            })
        }

        const handlePaste=()=>{
             router.push({
                name:'Profile'
            })
        }

        const handleLogout=async()=>{
            await logout()
            router.push('/')
        }

        return {
            handleProfile,
            handleSettings,
            handlePassword,
            handlePaste,
            handleLogout
        }

        
    }
}
</script>

<style>

</style>