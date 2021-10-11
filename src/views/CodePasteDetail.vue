<template>
<div class="min-h-screen px-5 md:px-20 pt-10 flex md:flex-row flex-col ">
    <div class="w-full md:w-10/12" v-if="pasteData && hasPassword && !error" >
      <p class="text-center">
        Oopsy!! you need a password to view this paste
      </p>
      <form @submit.prevent='handleFormPassword' >
        <AppInput @InputChange='handlePasswordInput' title='Paste password' placeholder='Enter the secret passord for the paste' inputType='password' customError='' :requiredType='true' />
        <div class='flex items-center justify-center my-5'>
          <button class=' py-2 px-5 font-medium rounded-md mr-4'
          :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
            Fetch Paste
          </button>
          
        </div>
      </form>
    </div>
    <div class=" w-full md:w-10/12" v-else-if="pasteData && !error">

      <div :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 ':'bg-gray-700' " class=' rounded-lg p-2 my-2' v-if='success'>
            <p class='text-green-600  text-sm my-1'>Successfully updated</p>

      </div>
      <div :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 ':'bg-gray-700' " class=' rounded-lg p-2 my-2' v-if='pasteError'>
            <p class='text-red-400  text-sm my-1'  >{{error}}</p>

      </div>

      <h2 class='font-medium text-2xl'>
        {{pasteData.data.title.length?pasteData.data.title:'Untitled'}}
      </h2>
      <hr class='border-gray-500 mb-2'>

      <div class="flex justify-end items-center mb-2">
        <button @click='handleCopy' class='px-2 py-1 bg-green-600 rounded-lg flex cursor-pointer focus:outline-none'>
            <div class='flex justify-center items-center mr-1' >
                <ion-icon  name="add" class="text-2xl"></ion-icon>
            </div>
              <span>
                  Copy
              </span>
        </button>
        
      </div>
      <!-- <pre v-highlightjs><code class="python shadow-lg rounded-md">{{code}}</code></pre> -->
      <VCodeMirror  @update:value='handleUpdate' 
                    :options='cmOptions' 
                    :value='code' 
                    :mode='mode'
                    :readonly='readonly'
                    class='w-full shadow-xl my-5 bg-gray-700 h-96 resize-none rounded-lg outline-none  text-base' />
      
      <div v-if="!readonly">
        <h2 class='font-semibold text-xl'>
        Optional Paste Setting
        </h2>
        <hr class='border-gray-500 '>
        <form @submit.prevent='handleSubmit' >

          <AppSelect @selectChange='changeDefaultLang' :value='defaultLang' :selectOption='languages' title='Syntax highlighting' />
          <AppSelect @selectChange='changeDefaultExpire' :value='defaultExpire' :selectOption='expirations' title='Paste Expiration' />
          <AppSelect @selectChange='changeDefaultPrivacy' :value='defaultPrivacy' :selectOption='["Public","Private"]' title='Paste Exposure' />
          <PasteFolderTitle :value="defaultFolder" :openNewFolder='openNewFolder'  @newFolder='handleNewFolder' @selectChange='handlePasteFolder' />
          <AppInput title='Paste Name / Title' :value='pasteTitle' placeholde='Paste title' inputType='text' @InputChange='changePasteTitle' />
          <CreatePastePasswordInput :passwordOn="passwordOn" :passwordValue='pastePassword' title='Password' @passwordChange='handlePassword' />
          <div class='flex items-center my-5'>
            <button class='py-2 px-5 font-medium rounded-md mr-4'
            :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-700' ">
              Edit Paste
            </button>
            
          </div>
        </form>
      </div>

    </div>

    <div class=" w-full md:w-10/12" v-if='!error && !pasteData'>
      <p>
        Loading the paste ... please wait!
      </p>
    </div>

    <div class=" w-full md:w-10/12 text-center text-lg text-red-500" v-if='error && !pasteData'>
      <p>
       {{error}}
      </p>
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
import PasteFolderTitle from '../components/PasteFolderTitle.vue'

import { component as VueCodeHighlight } from 'vue-code-highlight';
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import { VCodeMirror } from 'vue3-code-mirror'
import getPaste from '@/composibles/getPaste'
import handleNewPaste from '@/composibles/handleNewPaste'

import {computed, onBeforeMount, ref} from 'vue'
import {useStore} from 'vuex'
export default {
    components:{    
        PasteList,
        CodeHighlight,
        VueCodeHighlight,
        VCodeMirror,
        AppSelect,
        AppInput,
        CreatePastePasswordInput,
        PasteFolderTitle
    },
    props:{
      uuid:{
        type:String
      }
    },
    setup({uuid}){
        const code= ref(null)

        const store=useStore()
        const {error:pasteError,postToAPI}=handleNewPaste()

        const languages=computed(()=>{
          return store.getters.getLanguages
        })

        const expirations=computed(()=>{
          return store.getters.getExpirations
        })

        const isDark=computed(()=>{
        return store.getters.getUserPastePrefence.nightMode ? "dracula" : "white"
      })

        const userOn=computed(()=>{
          return store.getters.getUser ? true : false
        })
        const success=ref(false)
        const readonly=ref(true)
        const defaultLang=ref('python')
        const defaultExpire=ref('never')
        const defaultPrivacy=ref('public')
        const defaultFolder=ref('no folder selected')
        const openNewFolder=ref(false)
        const newFolder=ref('')
        const pasteTitle=ref('')
        const pastePassword=ref('')
        const passwordOn=ref(false)
        const userPastePassword=ref(null)
        const hasPassword=ref(false)

        const mode= ref({name:'python',json:true})
        const {handleGetPaste,error}=getPaste()
        const pasteData=ref(null)

        onBeforeMount(async()=>{
            console.log("in before",userOn)
            pasteData.value = await handleGetPaste(uuid,userOn.value)

            if(pasteData.value){

              code.value=pasteData.value.data.code
           
              readonly.value=pasteData.value.data.read_only

              console.log(pasteData.value)

              defaultLang.value=pasteData.value.data.language
              defaultExpire.value=pasteData.value.data.expiration[0]+pasteData.value.data.expiration.slice(1,pasteData.value.data.expiration.length).toLowerCase()
              defaultPrivacy.value=pasteData.value.data.public ? "Public" : "Private"
              defaultFolder.value = pasteData.value.data.folder ? pasteData.value.folder : 'no folder selected'
              pasteTitle.value=pasteData.value.data.title
              pastePassword.value=pasteData.value.data.password
              passwordOn.value=pasteData.value.data.password.length ? true : false
              hasPassword.value=pasteData.value.data.password.length ? true : false

              mode.value={name:pasteData.value.data.language=='PLAINTEXT'?'null':pasteData.value.data.language.toLowerCase(),json:true}


              console.log(defaultExpire.value)
            }
        })

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

      const handleUpdate=(value)=>{
        // console.log(value)
        code.value=value
        
      }

      const changePasteTitle=(title)=>{
        pasteTitle.value=title
        console.log(pasteTitle.value)
      }

      const handlePassword=(value)=>{
        pastePassword.value=value
        console.log(pastePassword.value)
      }


      const cmOptions= ref({
        tabSize: 4,
        lineNumbers: true,
        // line: true,
        theme:isDark.value
      })

      const handleSubmit=async()=>{

        // TODO: Write composible to handle request to edit paste and also check user before handling edit
        // const isUser=await getUser()

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
          await store.dispatch('handleChangeUser')
          data=await postToAPI(pasteObj,true,uuid)
          console.log(pasteObj)

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
          await store.dispatch('handleChangeUser')
          data=await postToAPI(pasteObj,true,uuid)
          console.log(pasteObj)

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
          await store.dispatch('handleChangeUser')
          pasteData.value=await postToAPI(pasteObj,true,uuid)
          // console.log("data",data)
        }
        
        if(pasteError.value===null){
          success.value=true
          scrollTo(0,0)
          setTimeout(()=>{
            success.value=false
          },12000)
        }
      }

      const handleFormPassword=()=>{
        if(userPastePassword.value==pastePassword.value){
          hasPassword.value=false
        }
      }

      const handlePasswordInput=(value)=>{
        userPastePassword.value=value
      }

      const handleCopy=()=>{
        navigator.clipboard.writeText(code.value)
        alert("Copied !!!")
      }

        return {code,mode,cmOptions,readonly,error,pasteData,
                defaultLang,
                defaultExpire,
                defaultPrivacy,
                defaultFolder,
                openNewFolder,
                newFolder,
                pasteTitle,
                pastePassword,
                changeDefaultLang,
                changeDefaultExpire,
                changeDefaultPrivacy,
                handleNewFolder,
                handlePasteFolder,
                changePasteTitle,
                handlePassword,
                handleSubmit,
                passwordOn,
                handleFormPassword,
                handlePasswordInput,
                hasPassword,
                languages,
                expirations,
                handleCopy,
                success,
                handleUpdate,
                pasteError
                }
    }
}
</script>

<style>
code::-webkit-scrollbar{
  width:0;
}
</style>