<template>
  <div class="md:mt-20">
      <h2 class="font-semibold text-xl">
          Public Paste
      </h2>
      <hr class="border-gray-500">
      <PasteListItem/>
      <PasteListItem/>
      <PasteListItem/>
  </div>
</template>

<script>
import PasteListItem from './PasteListItem.vue'

export default {
    components:{
        PasteListItem
    }
}
</script>

<style>

</style>