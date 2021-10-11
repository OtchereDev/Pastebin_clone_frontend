<template>
  <div class="min-h-screen px-5 md:px-20 py-10 flex md:flex-row flex-col ">
    <div class=" w-full md:w-10/12">

      <!-- profile nav -->
      <TheProfileNavBar :totalViews='total_paste_view' :dateJoined='date_joined' />
      <div class='my-3'>
        <table v-if="all_paste && all_paste.length" class='border-gray-600 rounded-lg' style="width:100%">
          <tr style='text-align:left'>
            <th>Title</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
          <tr v-for="paste in all_paste" :key='paste.uuid'>
            <td>{{paste.title}}</td>
            <td>
              <router-link :to="{name:'CodePasteDetail',params:{uuid:paste.paste_uuid}}" class="underline text-blue-600">
                Preview
              </router-link>
            </td>
            <td>
              <span @click="handleEdit(paste.paste_uuid)" class='font-semibold text-green-800 mr-2 cursor-pointer hover:text-green-600'>
                Edit
              </span>
              <span @click="handleDelete(paste.paste_uuid)" class='font-semibold text-red-800 cursor-pointer hover:text-red-600'>
                Delete
              </span>
            </td>
          </tr>
          
        </table>
        <p v-else class='text-center my-3 p-3  rounded-md' :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-600' ">
          You have no paste yet
        </p>
      </div>
      <div >
          <div class='p-3 rounded-md  mt-5'
          :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 text-gray-800':'bg-gray-600' ">
              <p>

                    Hi OtchereDev, this is your personal Pastebin. Feel free to share this page with anyone you like.            <br><br>

                    Only you (when logged in) can see your folders, private pastes, and only you see the options to edit and delete.            <br><br>
              </p>

            <b>Your stats:</b>
            <br>

            <TheProfileStatics 
            :ActivePaste='total_number_of_paste'
            :PublicPaste='number_of_public_paste'
            :PrivatePaste='number_of_private_paste'
            :TotalPaste='total_number_of_paste' />
            <br>
                <b>Backup Your Pastes:</b><br>
                If you want a backup of all your content click the following link: <a href="#" class="text-blue-500">Download ZIP file of all my pastes</a>.
                        <br><br>
            <b>Privacy:</b>
            <br>
            To see what other people see on your pastebin, <a href="#" class="text-blue-500" >click here</a>.
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
import getProfile from '@/composibles/getProfile'
import { onBeforeMount, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import deletePaste from '@/composibles/deletePaste'

export default {
    components:{
        
        TheProfileStatics,
        TheProfileNavBar,
        PasteList
    },
    setup(){

      let total_number_of_paste=ref()
      let number_of_public_paste=ref()
      let number_of_private_paste=ref()
      let total_paste_view=ref()
      let all_paste=ref()
      let date_joined=ref()

      const router=useRouter()

      const {performAction,error,profile}=  getProfile()
      
      onBeforeMount(async()=>{
        
        await performAction()
        
        if(profile.value){

          total_number_of_paste.value = profile.value['total_number_of_paste'] 
          number_of_public_paste.value = profile.value['number_of_public_paste'] 
          number_of_private_paste.value =profile.value['number_of_private_paste']
          total_paste_view.value =profile.value['total_paste_view']
          all_paste.value =profile.value['all_paste']
          date_joined.value =profile.value['date_joined']
        }

        
      
      })

      const handleEdit=(uuid)=>{
        router.push({name:'CodePasteDetail',params:{uuid}})
      }

      const handleDelete=async(uuid)=>{
        // call composible for deleting paste

        const res = await deletePaste(uuid)

        // remove from current all paste
        if(res.value === null){

          all_paste.value=all_paste.value.filter(paste=>{
            console.log(paste.paste_uuid,uuid)
            return paste.paste_uuid!==uuid
          })
        }
      }

      return {
        total_number_of_paste,
        number_of_public_paste,
        number_of_private_paste,
        total_paste_view,
        all_paste,
        date_joined,
        error,
        handleEdit,
        handleDelete
      }
    }

}
</script>

<style>
  td, th {
  border: 1px solid rgba(75, 85, 99, var(--tw-border-opacity));
  border-style: solid none solid none;
  text-align: left;
  padding: 8px;
}
</style>