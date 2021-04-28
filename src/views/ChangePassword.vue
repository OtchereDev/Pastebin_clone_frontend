<template>
  <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <div class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                Change Password
            </h2>
            <hr class='border-gray-500 '>

            <div>
                <div class="flex items-center my-2 ">
                    <div  class="mr-4 w-60">
                        <h2>
                            Password Status:
                        </h2>
                    </div>

                    <div class="w-full">
                        <h2 class="text-green-600">
                            Ok!
                        </h2>
                    </div>

                </div>
                <AppInput title="Current Password" inputType='password' :requiredType='true' />
                <AppInput title="New Password" inputType='password' :requiredType='true' />
                <AppInput title="New Password Again" inputType='password' :requiredType='true' />
            </div>

            <div class='text-center'>
                <button class='bg-gray-700 py-2 px-5 font-medium rounded-md mr-4'>
                    Change Password
                </button>
            </div>

          <AccountRelatedPages/>

      </div>

 

  </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AccountRelatedPages from '@/components/AccountRelatedPages.vue'
export default {
    components:{
        AppInput,
        AccountRelatedPages
    }
}
</script>

<style>

</style>