<template>
    <div class="min-h-screen px-5  md:px-20 py-10 flex md:flex-row flex-col ">
      <div class=" w-full md:w-10/12">

            <h2 class='font-medium text-2xl'>
                My Settings 
            </h2>
            <hr class='border-gray-500 ' >
            <div class=' rounded-lg p-2 my-2'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' " v-if="error" >
              <p class='text-red-400  text-sm my-1' >{{error}}</p>

            </div>

            <form @submit.prevent='handleSubmit' >

              <div>
                
                  <AppSelect :value='defaultSyntax' @selectChange='handleSelectChangeSyntax' title="Default syntax" :selectOption='languages'/>
                  <AppSelect :value='defaultExpiration' @selectChange='handleSelectChangeExpiration' title="Default expiration" :selectOption='expirations'/>
                  <AppSelect :value='defaultExposure' @selectChange='handleSelectChangeExposure' title="Default exposure" :selectOption='["Public","Private"]'/>
                  <AppSelect :value='defaultMode' @selectChange='handleSelectChangeMode' title="Night mode" :selectOption='["enabled","disabled"]'/>

              </div>
              <div class="text-center">
                  <button class=' py-2 px-5 font-medium rounded-md mr-4'
                  :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
                      Update Settings
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
import AppSelect from '@/components/AppSelect.vue'
import PasteList from '@/components/PasteList.vue'
import AccountRelatedPages from '@/components/AccountRelatedPages.vue'
import handleProfileSettingUpdate from '@/composibles/handleProfileSettingUpdate'
import { ref } from '@vue/reactivity'
import {baseURI} from '@/composibles/appconfig'
import {useStore} from 'vuex'
import { computed, onBeforeMount } from '@vue/runtime-core'

export default {
    components:{
        AppSelect,
        AccountRelatedPages,
        PasteList
    },
    setup(){
      
      const store = useStore()

      const defaultSyntax=computed(()=>
        store.getters.getUserPastePrefence.defaultSyntax
      )
      const defaultExpiration=computed(()=>
        store.getters.getUserPastePrefence.defaultExpiration[0]+
        store.getters.getUserPastePrefence.defaultExpiration.slice(1,store.getters.getUserPastePrefence.defaultExpiration.length).toLowerCase()
      )
      const defaultExposure=computed(()=>
        store.getters.getUserPastePrefence.defaultExposure?"Public":"Private"
      )
      const defaultMode=computed(()=>
        store.getters.getUserPastePrefence.nightMode?"enabled":"disabled"
      )

      const languages = computed(()=>{
        return store.getters.getLanguages
      })

      const expirations=computed(()=>{
        return store.getters.getExpirations
      })

      // onBeforeMount(async()=>{
      //   await store.dispatch('handleChangeUserPreference')
      // })
      // console.log(store.getters.getUserPastePrefence.nightMode?"enabled":"disabled")

     
      const {postToAPI,error}=handleProfileSettingUpdate()

      const handleSelectChangeSyntax=(value)=>{
        defaultSyntax.value=value
      }

      const handleSelectChangeExpiration=(value)=>{
        defaultExpiration.value=value
      }

      const handleSelectChangeExposure=(value)=>{
        defaultExposure.value=value
      }

      const handleSelectChangeMode=(value)=>{
        defaultMode.value=value
        // console.log(value)
      }

      const handleSubmit=async()=>{
        
        const data={
          defaultSyntax:defaultSyntax.value,
          defaultExpiration:defaultExpiration.value.toUpperCase(),
          defaultExposure: defaultExposure.value =='Public' ? true : false,
          nightMode: defaultMode.value==='enabled' ? true : false
        }

        // console.log(data)

        // contact api with data

        const res = await postToAPI(`${baseURI}api/update/settings/`,data)

        

        if(res){
          store.commit('changeUserPreference',{data})
        }
      }
      

      return {
        defaultSyntax,
        defaultExpiration,
        defaultExposure,
        defaultMode,
        error,
        handleSelectChangeSyntax,
        handleSelectChangeExpiration,
        handleSelectChangeExposure,
        handleSelectChangeMode,
        handleSubmit,
        languages,
        expirations
      }
    }
}
</script>

<style>

</style>