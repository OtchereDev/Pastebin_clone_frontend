<template>
  <div class="text-base cursor-pointer">
      
      <div class="flex">
            <div class='flex justify-center items-center mr-1' >
                <ion-icon  name="earth-outline" class="text-2xl"></ion-icon>
            </div>
            <p class="text-blue-500 hover:text-blue-700" @click="handleClick">
                {{pasteTitle}}
            </p>
      </div>

      <div>
          <span>{{pasteLang}} |</span>
          <span> {{createdAt}} ago</span>
      </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
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
        },
        paste_uuid:{
            type:String,
            required:true
        }
    },
    setup({time,paste_uuid,language,title}){

        const router= useRouter()

        const createdAt=computed(()=>{
            return time
        })

        const pasteLang=computed(()=>{
            return language[0]+language.slice(1,language.length).toLowerCase()
        })

        const pasteTitle=computed(()=>{
            return title.length>10 ?title.slice(0,9)+'...':title
        })
        

        const handleClick=()=>{
            router.push({
                name:'CodePasteDetail',
                params:{
                    uuid:paste_uuid
                }
            })
        }

        return {createdAt,handleClick,pasteLang,pasteTitle}
    }
}
</script>

<style>

</style>