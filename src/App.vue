<template>
  <TheNavBar/>
  <router-view class="bg-gray-800 text-gray-100"/>
</template>

<script>
// @ is an alias to /src
import TheNavBar from '@/components/TheNavBar.vue'

export default {
  name: 'Home',
  components: {
    TheNavBar
  }
}
</script>

<style>

</style>
