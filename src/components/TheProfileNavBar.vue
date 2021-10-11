<template>
   <div>
          <div class="flex ">
              <div class='w-16 h-16 mr-3 rounded-md' 
              :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-600' "></div>
              <div class=" flex w-11/12 justify-between items-center">

                <div class="">
                    <h2 class="font-semibold text-lg mb-2">
                        OtchereDev's Pastebin
                    </h2>
                    <div class='flex items-center'>
                           
                            <ProfileIcon iconName='eye'  value='5' title='Number of times this Pastebin page has been viewed' />
                            <ProfileIcon iconName='eye'  :value='totalViews' title='Accumulative total unique visitors of all this users pastes' />
                            <ProfileIcon iconName='eye'  :value='`${dateJoined} days`' title='When user joined pastebin' :isLast='true' />
   
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
    },
    props:{
        totalViews:{
            type:Number,
            required:true,
            default:0
        },
        dateJoined:{
            type:Number,
            required:true,
            default:0
        }
    }
}
</script>

<style>

</style>