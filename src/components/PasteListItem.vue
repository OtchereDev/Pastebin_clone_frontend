<template>
  <div class="text-base">
      
      <div class="flex">
            <div class='flex justify-center items-center mr-1' >
                <ion-icon  name="eye" class="text-2xl"></ion-icon>
            </div>
            <p class="text-blue-500">
                Spotify DJango
            </p>
      </div>

      <div>
          <span>Python |</span>
          <span> 2min ago</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        language:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    }
}
</script>

<style>

</style>