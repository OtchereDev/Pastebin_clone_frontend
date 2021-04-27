<template>
  <div class="min-h-screen px-5 md:px-20 pt-10 flex md:flex-row flex-col ">
    <div class=" w-full md:w-10/12">

      <h2 class='font-medium text-2xl'>
        New Paste
      </h2>
      <hr class='border-gray-500 '>

      <VCodeMirror @update:value='handleUpdate' 
                    :modeOption='cmOptions' 
                    value='' 
                    :mode='mode'
                    class='w-full code-area my-5 bg-gray-700 h-96 resize-none rounded-lg outline-none  text-base' />
      
      <h2 class='font-semibold text-xl'>
        Optional Paste Setting
      </h2>
      <hr class='border-gray-500 '>
      <AppSelect :selectOption='["javascript","python"]' title='Syntax highlighting' />
      <AppSelect :selectOption='["never","1 day","1 year"]' title='Paste Expiration' />
      <AppSelect :selectOption='["public","private"]' title='Paste Exposure' />
      <PasteFolderTitle/>
      

    </div>

    <div class='md:w-2/12 w-full p-2 pb-10 md:pb-0'>
      <PasteList class='ml-4' style='margin-top:0;' />
    </div>
  </div>
</template>

<script>

import PasteList from '../components/PasteList.vue'
import AppSelect from '../components/AppSelect.vue'
import PasteFolderTitle from '../components/PasteFolderTitle.vue'
import { VCodeMirror } from 'vue3-code-mirror'
import {ref} from 'vue'



export default {
    components:{    
        PasteList,
        VCodeMirror,
        AppSelect,
        PasteFolderTitle
    },
    setup(){
      const code= ref('const a = 10')
      
      const cmOptions= ref({
        // codemirror options
        tabSize: 4,
        mode: 'text/python',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      })

      const handleUpdate=(value)=>{
        // console.log(value)
        
      }

      const handleSwitch=()=>{
        mode.value={
          name:'python',json:true
        }
      }
      const handleSwitchJS=()=>{
        mode.value={
          name:'javascript',json:true
        }
      }

      const mode= ref({name:'javascript',json:true})

      return {code,cmOptions,handleUpdate,mode,handleSwitch,handleSwitchJS}
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

  .v-code-mirror{
    border-radius: 32px;
  }
</style>