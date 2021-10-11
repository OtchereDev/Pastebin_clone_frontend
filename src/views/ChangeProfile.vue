<template>
  <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <div class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                My Profile
            </h2>
            <hr class='border-gray-500 '>

            <div class=' rounded-lg p-2 my-2'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' " v-if="error" >
              <p class='text-red-400  text-sm my-1' >{{error}}</p>

            </div>
            
            <form @submit.prevent='handleSubmit' >



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
                
                    <AppInput :value='email_address'  :disabled='true' title="Email address" inputType='email'  />
                    <AppInput :value='website_url' placeholder='Your website url' @InputChange='handleInputChangeWebsite' title="Website URL" inputType='url'  />
                    <AppInput :value='location' placeholder='Location' @InputChange='handleInputChangeLocation' title="Location" inputType='text'  />
                    <div class="flex items-center my-2 ">
                        <div  class="mr-4 w-60">
                            <h2>
                                Avatar:
                            </h2>
                        </div>

                        <div class="w-full">
                            <div class="w-20 h-20 bg-gray-50 relative rounded-md flex justify-center items-center cursor-pointer text-black">
                                <ion-icon  name="person-outline" class="text-4xl cursor-pointer"></ion-icon>
                                <input @change="handleAvatarChange" type="file" name="" id="" class="absolute w-full h-full opacity-0 cursor-pointer">
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
                    <button class=' py-2 px-5 font-medium rounded-md mr-4'
                    :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
                        <span v-if='!requesting'>
                            Update Profile
                        </span> 
                        <span v-else>
                            Updating
                        </span>
                    </button>
                </div>
            </form>

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
import handleProfileSettingUpdate from '@/composibles/handleProfileSettingUpdate'
import { ref } from '@vue/reactivity'
import {baseURI} from '@/composibles/appconfig'
import { useStore } from 'vuex'

export default {
    components:{
        
        AccountRelatedPages,
        PasteList,
        AppInput
    },
    setup(){
        const email_address=ref('')
        const website_url=ref('')
        const location = ref('')
        const avatar=ref('')

        const store = useStore()
        const requesting = ref(false)

        const {postToAPI,error}=handleProfileSettingUpdate()

        const handleInputChangeEmail=(value)=>{
            email_address.value=value
        }

        const handleInputChangeWebsite=(value)=>{
            website_url.value=value
        }

        const handleInputChangeLocation=(value)=>{
            location.value=value
        }

        const handleAvatarChange=(e)=>{
           avatar.value= e.target.files[0]
        }

        const handleSubmit=async()=>{
            const data={
                avatar:avatar.value,
                location:location.value,
                website_url:website_url.value,
               
            }

            await store.dispatch('handleChangeUser')

            const isUser=computed(()=>{
                return store.getters.getUser
            })

            // contact API

            if (isUser){
                requesting.value=true
                const res = await postToAPI(`${baseURI}api/update/profile/`,data,true)
                requesting.value=false

            }
        }



        return {
            email_address,
            website_url,
            location,
            error,
            handleInputChangeEmail,
            handleInputChangeWebsite,
            handleInputChangeLocation,
            handleAvatarChange,
            handleSubmit,
            requesting
        }
    }
}
</script>

<style>

</style>