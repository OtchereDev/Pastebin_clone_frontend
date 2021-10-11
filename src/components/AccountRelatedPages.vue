<template>
   <div class="p-2 rounded-md border border-gray-600 w-8/12 md:w-4/12 mt-20">
      <h3>
          Account Related Pages
      </h3>
      <div class="flex flex-col">

        <AppBaseBtn @click='handleClickProfile' title='Profile' />
        <AppBaseBtn @click='handleClickSettings' title='Settings' />
        <AppBaseBtn @click='handleClickChangePassword' title='Password Change' />
        <AppBaseBtn  title='Delete Account' />
       

      </div>
  </div>
</template>

<script>
import AppBaseBtn from '@/components/AppBaseBtn.vue'
import { useRouter } from 'vue-router'
export default {
  components:{
    AppBaseBtn
  },
  setup(){

    const router = useRouter()

    const handleClickProfile=()=>{
      router.push({name:'Profile'})
    }

    const handleClickSettings=()=>{
      router.push({name:'MySetting'})
    }

    const handleClickChangePassword=()=>{
      router.push({name:'ChangePassword'})
    }

    return {
      handleClickProfile,
      handleClickSettings,
      handleClickChangePassword
    }
  }
}
</script>

<style>

</style>