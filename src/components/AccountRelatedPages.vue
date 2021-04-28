<template>
   <div class="p-2 rounded-md border border-gray-600 w-8/12 md:w-4/12 mt-20">
      <h3>
          Account Related Pages
      </h3>
      <div class="flex flex-col">

        <AppBaseBtn title='Profile' />
        <AppBaseBtn title='Settings' />
        <AppBaseBtn title='Password Change' />
        <AppBaseBtn title='Delete Account' />
       

      </div>
  </div>
</template>

<script>
import AppBaseBtn from '@/components/AppBaseBtn.vue'
export default {
  components:{
    AppBaseBtn
  }
}
</script>

<style>

</style>