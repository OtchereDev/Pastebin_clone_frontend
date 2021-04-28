<template>
    <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <div class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                My Settings
            </h2>
            <hr class='border-gray-500 '>

            <div>
               
                <AppSelect title="Default syntax" :selectOption='["none","python","javascript"]'/>
                <AppSelect title="Default expiration" :selectOption='["never","1 day"]'/>
                <AppSelect title="Default exposure" :selectOption='["public","private"]'/>
                <AppSelect title="Night mode" :selectOption='["enabled","disabled"]'/>

            </div>
            <div class="text-center">
                <button class='bg-gray-700 py-2 px-5 font-medium rounded-md mr-4'>
                    Update Settings
                </button>
            </div>

           

          <AccountRelatedPages/>

      </div>


    <div class='md:w-2/12 w-full p-2 pb-10 md:pb-0'>
      <PasteList class='ml-4' style='margin-top:0;' />
    </div>  

 

  </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue'
import PasteList from '@/components/PasteList.vue'
import AccountRelatedPages from '@/components/AccountRelatedPages.vue'

export default {
    components:{
        AppSelect,
        AccountRelatedPages,
        PasteList
    }
}
</script>

<style>

</style>