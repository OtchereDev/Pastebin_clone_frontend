<template>
    <div class='min-h-screen'>
        <div class="px-5 lg:px-72 py-10 md:py-14" >
            <h2 class="font-medium text-2xl ">
                No Activation Email Page
            </h2>

            <hr class="border-gray-600 border-2">

            <div class='flex items-center mt-3 p-1 border border-gray-600'>
                <div class='h-8 w-8 rounded-full mr-2 border-gray-200 border flex justify-center items-center'>
                    <p>i</p>
                </div>
                <p>
                    If you have not received the registration confirmation email, you can request another one here.
                </p>
            </div>

            <!-- Email component goes here -->
            
            <AppEmailComponentVue/>

            <!-- related pages goes here -->
            <AuthRelatedPages currentPage='activate' />
        </div>
    </div>
</template>

<script>
import AppEmailComponentVue from '../components/AppEmailComponent.vue'
import AuthRelatedPages from '../components/AuthRelatedPages.vue'

export default {
    name:'ForgotPassword',
    components:{
        AppEmailComponentVue,
        AuthRelatedPages,
    }
}
</script>

<style>

</style>