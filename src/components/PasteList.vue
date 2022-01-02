<template>
  <div class="md:mt-20" :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-200 text-gray-800 p-4 rounded-lg':'' ">
      <h2 class="font-semibold text-xl">
          Public Paste
      </h2>
      <hr class="border-gray-500">
      <div v-if='data'>

      <PasteListItem v-for='paste in data' :key='paste.id' :paste_uuid='paste.paste_uuid'  :title='paste.title' :language='paste.language' time='2min' />
      </div>
      <!-- <PasteListItem title='Spotify DJango' language='Python' time='2min' />
      <PasteListItem title='Spotify DJango' language='Python' time='2min' /> -->
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core'
import PasteListItem from './PasteListItem.vue'
import {baseURI} from '@/composibles/appconfig'
import {ref} from 'vue'
import axios from 'axios'

export default {
    components:{
        PasteListItem
    },
    setup(){
        const data=ref(null)
        onBeforeMount(async()=>{
            const res=await axios.get(`${baseURI}api/top_paste/`)

            const {data:top_paste}=res
            

            data.value=top_paste.top_paste

        })

        return {data}
    }
}
</script>

<style>

</style>