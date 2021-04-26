<template>
  <div class="min-h-screen px-5 md:px-20 pt-10 flex md:flex-row flex-col ">
    <div class=" w-full md:w-10/12">

      <h2 class='font-medium text-2xl'>
        Your Paste
      </h2>
      <hr class='border-gray-500 '>

      <textarea class='w-full code-area my-5 bg-gray-700 h-96 resize-none rounded-lg outline-none p-2 text-lg'></textarea>
      
      <hr class='border-gray-500 '>
    </div>

    <div class='md:w-2/12 w-full p-2 pb-10 md:pb-0'>
      <PasteList class='ml-4' style='margin-top:0;' />
    </div>
  </div>
</template>

<script>

import PasteList from '../components/PasteList.vue'

export default {
    components:{    
        PasteList
    }
}
</script>

<style>
  .code-area::-webkit-scrollbar{
    width:10px;
    background: rgba(128, 128, 128, 0.644);
    border-radius:0.5rem;

  }

  .code-area::-webkit-scrollbar-thumb{
    width:2px;
    background:rgba(0, 0, 0, 0.678);
    border-radius:32px
  }
</style>