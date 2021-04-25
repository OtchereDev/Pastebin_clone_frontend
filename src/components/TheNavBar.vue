<template>
  <nav class="w-full px-6 py-3 flex justify-between text-gray-200 bg-gray-800 items-center">
      <div class="flex items-center">
          <h1>
              PasteBin
          </h1>
          <button class='px-2 py-1 bg-green-600 rounded-lg ml-7'>
              Paste
          </button>
      </div>

      <div class='w-5/12 lg:w-2/12 flex items-center' v-if="true">
          <button class='px-2 py-1 border border-gray-100 rounded-lg mr-5'>
              Log In
          </button>
          <button class='px-2 py-1 bg-gray-100 text-gray-800 rounded-lg'>
              Sign Up
          </button>
      </div>
      <div class="w-12 h-12 rounded-full bg-white" v-else>
          <!-- Avatar goes here -->
      </div>
  </nav>
</template>

<script>
export default {
    name:'TheNavBar'
}
</script>

<style>

</style>