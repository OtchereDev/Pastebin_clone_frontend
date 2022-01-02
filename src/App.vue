<template>
  <TheNavBar class='font-primary' />
  <!-- <router-view class="bg-gray-800 text-gray-100"/> -->
  <router-view class='font-primary' :class='!this.$store.getters.getUserPastePrefence.nightMode ? "bg-gray-100 text-gray-900":"bg-gray-800 text-gray-100"' />
</template>

<script>
// @ is an alias to /src
import TheNavBar from '@/components/TheNavBar.vue'
import {onBeforeMount} from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    TheNavBar
  },
  setup(){
    const store=useStore()
   onBeforeMount(async()=>{
        await store.dispatch('handleChangeUserPreference')
        await store.dispatch("handleGetUserProfile")
      })

  }
}
</script>

<style>

</style>
