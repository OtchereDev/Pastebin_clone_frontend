<template>
  <div class="min-h-screen px-5 md:px-20 pt-10 flex md:flex-row flex-col ">
    <div class=" w-full md:w-10/12">

      <!-- profile nav -->
      <TheProfileNavBar/>
      <div >
          <div class='p-3 rounded-md bg-gray-600 mt-5'>
              <p>

                    Hi OtchereDev, this is your personal Pastebin. Feel free to share this page with anyone you like.            <br><br>

                    Only you (when logged in) can see your folders, private pastes, and only you see the options to edit and delete.            <br><br>
              </p>

            <b>Your stats:</b>
            <br>

            <TheProfileStatics 
            ActivePaste='1'
            PublicPaste='1'
            PrivatePaste='0'
            TotalPaste='1' />
            <br>
                <b>Backup Your Pastes:</b><br>
                If you want a backup of all your content click the following link: <a href="/user/backup" class="text-blue-500">Download ZIP file of all my pastes</a>.
                        <br><br>
            <b>Privacy:</b>
            <br>
            To see what other people see on your pastebin, <a href="/u/OtchereDev?guest=1" class="text-blue-500" >click here</a>.
            <br>
        </div>
      </div>
    </div>

    <div class='md:w-2/12 w-full p-2 pb-10 md:pb-0'>
      <PasteList/>
    </div>
  </div>
</template>

<script>

import TheProfileStatics from '@/components/TheProfileStatics.vue'
import TheProfileNavBar from '@/components/TheProfileNavBar.vue'
import PasteList from '../components/PasteList.vue'

export default {
    components:{
        
        TheProfileStatics,
        TheProfileNavBar,
        PasteList
    }
}
</script>

<style>

</style>