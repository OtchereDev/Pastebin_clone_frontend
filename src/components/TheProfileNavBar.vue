<template>
   <div>
          <div class="flex ">
              <div class='w-16 h-16 bg-gray-500 mr-3 rounded-md'></div>
              <div class=" flex w-11/12 justify-between items-center">

                <div class="">
                    <h2 class="font-semibold text-lg mb-2">
                        OtchereDev's Pastebin
                    </h2>
                    <div class='flex items-center'>
                           
                            <ProfileIcon iconName='eye'  value='5' title='Number of times this Pastebin page has been viewed' />
                            <ProfileIcon iconName='eye'  value='6' title='Accumulative total unique visitors of all this users pastes' />
                            <ProfileIcon iconName='eye'  value='165 days' title='When user joined pastebin' :isLast='true' />
   
                    </div>
                </div>
                <div>
                    <TheSearchPaste/>
                </div>
              </div>
          </div>
      </div>
</template>

<script>
import ProfileIcon from '@/components/ProfileIcon.vue'
import TheSearchPaste from '@/components/TheSearchPaste.vue'

export default {
    components:{
        ProfileIcon,
        TheSearchPaste,
    }
}
</script>

<style>

</style>