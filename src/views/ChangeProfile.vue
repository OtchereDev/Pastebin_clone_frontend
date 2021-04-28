<template>
  <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <div class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                My Profile
            </h2>
            <hr class='border-gray-500 '>

            <div>

                <div class="flex items-center my-2 ">
                    <div  class="mr-4 w-60">
                        <h2>
                            Username:
                        </h2>
                    </div>

                    <div class="w-full">
                        <h2 class="font-semibold">
                            OtchereDev
                        </h2>
                    </div>

                </div>
               
                <AppInput title="Email address" inputType='email'  />
                <AppInput title="Website URL" inputType='text'  />
                <AppInput title="Location" inputType='text'  />
                <div class="flex items-center my-2 ">
                    <div  class="mr-4 w-60">
                        <h2>
                            Avatar:
                        </h2>
                    </div>

                    <div class="w-full">
                        <div class="w-20 h-20 bg-gray-50 relative rounded-md flex justify-center items-center cursor-pointer text-black">
                            <ion-icon  name="person-outline" class="text-4xl cursor-pointer"></ion-icon>
                            <input type="file" name="" id="" class="absolute w-full h-full opacity-0 cursor-pointer">
                        </div>
                    </div>

                </div>
                <div class="flex items-center my-2 ">
                    <div  class="mr-4 w-60">
                        <h2>
                            Account type:
                        </h2>
                    </div>

                    <div class="w-full">
                        <h2 class=" font-semibold">
                            Free
                        </h2>
                    </div>

                </div>

            </div>
            <div class="text-center">
                <button class='bg-gray-700 py-2 px-5 font-medium rounded-md mr-4'>
                    Update Profile
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

import AppInput from '@/components/AppInput.vue'
import PasteList from '@/components/PasteList.vue'
import AccountRelatedPages from '@/components/AccountRelatedPages.vue'

export default {
    components:{
        
        AccountRelatedPages,
        PasteList,
        AppInput
    }
}
</script>

<style>

</style>