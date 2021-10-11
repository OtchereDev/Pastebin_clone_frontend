<template>
  <div class="min-h-screen px-5 md:px-20 pt-10 flex md:flex-row flex-col ">
    <div class=" w-full md:w-10/12">

      <h2 class='font-medium text-2xl'>
        New Paste
      </h2>
      <hr class='border-gray-500 '>

      <div :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 ':'bg-gray-700' " class=' rounded-lg p-2 my-2' v-if='error'>
            <p class='text-red-400  text-sm my-1'  >{{error}}</p>

      </div>

      <VCodeMirror @update:value='handleUpdate' 
                    :options='{...cmOptions}' 
                    value='' 
                    :mode='mode'
                    :readonly='false'
                    
                    
                    class='w-full shadow-xl my-5 bg-gray-700 h-96 resize-none rounded-lg outline-none  text-base' />
    
      <h2 class='font-semibold text-xl'>
        Optional Paste Setting
      </h2>
      <hr class='border-gray-500 '>
      <form @submit.prevent='handleSubmit' >

        <AppSelect @selectChange='changeDefaultLang' :value='defaultLang' :selectOption='languages' title='Syntax highlighting' />
        <AppSelect @selectChange='changeDefaultExpire' :value='defaultExpire' :selectOption='expirations' title='Paste Expiration' />
        <AppSelect @selectChange='changeDefaultPrivacy' :value='defaultPrivacy' :selectOption='["Public","Private"]' title='Paste Exposure' />
        <PasteFolderTitle :value="defaultFolder" :openNewFolder='openNewFolder'  @newFolder='handleNewFolder' @selectChange='handlePasteFolder' />
        <AppInput title='Paste Name / Title' placeholde='Paste title' inputType='text' @InputChange='changePasteTitle' />
        <CreatePastePasswordInput title='Password' @passwordChange='handlePassword' />
        <div class='flex items-center my-5'>
          <button class=' py-2 px-5 font-medium rounded-md mr-4'
          :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800':'bg-gray-700' ">
            Create New Paste
          </button>
          <div class='flex items-center' v-if='isUser' >

              <input type="checkbox" v-model='guestPost'  class="p-2 mr-2 bg-gray-600 ">
              <label class="text-lg">Paste as a guest</label>
              
          </div>
        </div>
      </form>

    </div>

    <div class='md:w-2/12 w-full p-2 pb-10 md:pb-0'>
      <PasteList class='ml-4' style='margin-top:0;' />
    </div>
  </div>
</template>

<script>

import PasteList from '../components/PasteList.vue'
import AppSelect from '../components/AppSelect.vue'
import AppInput from '../components/AppInput.vue'
import CreatePastePasswordInput from '../components/CreatePastePasswordInput.vue'
import CreatePasteTitleInput from '../components/CreatePasteTitleInput.vue'
import PasteFolderTitle from '../components/PasteFolderTitle.vue'
import { VCodeMirror } from 'vue3-code-mirror'
import {ref,computed, onBeforeMount,watch} from 'vue'
import handleNewPaste from '@/composibles/handleNewPaste'

import { useRouter } from 'vue-router'
import {useStore} from 'vuex'

export default {
    components:{    
        PasteList,
        VCodeMirror,
        AppSelect,
        AppInput,
        PasteFolderTitle,
        CreatePastePasswordInput,
        CreatePasteTitleInput,
    },
    setup(){
      const code= ref('')
      const defaultLang=ref('PLAINTEXT')
      const defaultExpire=ref('Never')
      const defaultPrivacy=ref('Public')
      const defaultFolder=ref('no folder selected')
      const openNewFolder=ref(false)
      const newFolder=ref('')
      const pasteTitle=ref('')
      const pastePassword=ref('')
      const guestPost=ref(false)

      const store=useStore()
      const userPreference=computed(()=>{
        return store.getters.getUserPastePrefence
      })

      onBeforeMount(async()=>{

        // await store.dispatch('handleChangeUserPreference')

       

        defaultLang.value=userPreference.value.defaultSyntax
        defaultExpire.value=userPreference.value.defaultExpiration
        defaultPrivacy.value=userPreference.value.defaultExposure?'Public':'Private'




      })

      const languages=computed(()=>{
        return store.getters.getLanguages
      })

      const expirations=computed(()=>{
        return store.getters.getExpirations
      })

      const isDark=computed(()=>{
        return store.getters.getUserPastePrefence.nightMode ? "dracula" : "white"
      })
      

      const router =useRouter()

      const {error,postToAPI}=handleNewPaste()

      const isUser=computed(()=>{
        return store.getters.getUser
      })

      const handleSubmit=async()=>{

        await store.dispatch('handleChangeUser')

        let withAuth = guestPost.value ? false : isUser 

        if(guestPost.value){

          defaultFolder.value='no folder selected'
          newFolder.value=''

        }


        let data
        
        if(defaultFolder.value==='no folder selected'  && newFolder.value.length){

          const pasteObj={
            code:code.value,
            language:defaultLang.value.toUpperCase(),
            expiration:defaultExpire.value.toUpperCase(),
            public:defaultPrivacy.value=='Public'? true : false ,
            syntax_highlighting:true,
            folder:newFolder.value,
            password:pastePassword.value,
            title:pasteTitle.value,
          }
          
          data=await postToAPI(pasteObj,withAuth)

        }
        else if(defaultFolder.value!=='no folder selected'){
          const pasteObj={
            code:code.value,
            language:defaultLang.value.toUpperCase(),
            expiration:defaultExpire.value.toUpperCase(),
            public: defaultPrivacy.value=='Public'? true : false ,
            folder:defaultFolder.value,
            password:pastePassword.value,
            title:pasteTitle.value,
            syntax_highlighting:true
          }
          data=await postToAPI(pasteObj,withAuth)

        }else{
          const pasteObj={
            code:code.value,
            language:defaultLang.value.toUpperCase(),
            expiration:defaultExpire.value.toUpperCase(),
            public:defaultPrivacy.value=='Public'? true : false ,
            password:pastePassword.value,
            title:pasteTitle.value,
            syntax_highlighting:true
            
          }
          console.log(pasteObj)
          data=await postToAPI(pasteObj,withAuth)
        }
        
        if(error.value===null){
          router.push(`/paste/${data.uuid}`)
        }

      }
      
      const cmOptions= ref({
        tabSize: 4,
        lineNumbers: true,
        // line: true,
        // theme: isDark.value
      })

      watch(isDark,()=>{
        cmOptions.value= ref({
        tabSize: 4,
        lineNumbers: true,
        // line: true,
        theme: isDark.value
      })
      })

      const handleUpdate=(value)=>{
        // console.log(value)
        code.value=value
        
      }

      


      const mode= ref({name:defaultLang.value=='PLAINTEXT'?'null':'python',json:true})

      const changeDefaultLang=(value)=>{
        defaultLang.value=value
        mode.value={
          name: value=='PLAINTEXT'?'null':value.toLowerCase(),json:true
        }
        console.log(defaultLang.value)
      }
      const changeDefaultExpire=(value)=>{
        defaultExpire.value=value
        console.log(defaultExpire.value)
      }
      const changeDefaultPrivacy=(value)=>{
        defaultPrivacy.value=value
        console.log(defaultPrivacy.value)
      }

      const handleNewFolder=(value)=>{
        newFolder.value=value
        console.log(defaultFolder.value)
        console.log(newFolder.value)
      }
      const handlePasteFolder=(value)=>{
        defaultFolder.value=value
        console.log(defaultFolder.value)

      }

      const changePasteTitle=(title)=>{
        pasteTitle.value=title
        console.log(pasteTitle.value)
      }

      const handlePassword=(value)=>{
        pastePassword.value=value
        console.log(pastePassword.value)
      }

      


      return {code,cmOptions,handleUpdate,mode,defaultLang,
              defaultExpire,
              defaultPrivacy,
              defaultFolder,
              changeDefaultLang,
              changeDefaultExpire,
              changeDefaultPrivacy,
              handleNewFolder,
              handlePasteFolder,
              handlePassword,
              openNewFolder,
              changePasteTitle,
              handleSubmit,
              error,
              languages,
              expirations,
              isUser,
              guestPost}
    }
    
}
</script>

<style>
  .CodeMirror-vscrollbar::-webkit-scrollbar{
    width:10px;
    background: rgba(128, 128, 128, 0.644);
    border-radius:0.5rem;

  }

  .CodeMirror-vscrollbar::-webkit-scrollbar-thumb{
    width:2px;
    background:rgba(0, 0, 0, 0.678);
    border-radius:32px
  }

  .CodeMirror-vscrollbar{
    width:10px;
    background: rgba(128, 128, 128, 0.644);
    border-radius:0.5rem;
  }

  .CodeMirror{
    border-radius: 0.5rem;
  }
</style>