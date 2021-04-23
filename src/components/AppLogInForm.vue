<template>
  <form class="w-full mt-5 md:w-10/12 md:mx-auto">
      <div class="flex  items-center justify-between">
          <label class="block  mr-5" for="">Username:<span class="text-red-500">*</span></label>
          <input class="block w-8/12 p-2 bg-gray-600 rounded-lg outline-none" placeholder="Your username" type="text" name="" id="">
      </div>
      <div class="flex  items-center mt-2 justify-between">
          <label class="block  mr-5" for="">Password:<span class="text-red-500">*</span></label>
          <input class="block w-8/12 p-2 bg-gray-600 rounded-lg outline-none" placeholder="Your password" type="password" name="" id="">
      </div>
      <div class="mt-5 flex justify-center items-center">
          <button class='px-4 py-2 bg-gray-700  rounded'>
              Login
          </button>
      </div>
  </form>
</template>

<script>
export default {

}
</script>

<style>

</style>