<template>
    <div class='flex items-center'>
        <div class='flex-col flex w-full'>

        <AppSelect @inputChange='handleInputChange' @selectChange='changeOption' :value='folderValue' :disabled='disabled'  :selectOption='user_folders' :folder='showAddFolder' title='Paste Folder' class="w-full" />

        </div>
        <div>
            <div @click='addFolder' v-if="!showAddFolder" :class="!this.$store.getters.getUserPastePrefence.nightMode?'bg-gray-300 ':'bg-gray-50' " class="w-8 h-8  ml-3 rounded-full cursor-pointer flex justify-center items-center">
                <div class='flex justify-center items-center' >
                    <ion-icon name="add"  class="text-2xl text-blue-700 font-bold"></ion-icon>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue'
import { ref } from '@vue/reactivity'
import {useStore} from 'vuex'
import { computed, onBeforeMount } from '@vue/runtime-core'
export default {
    components:{
        AppSelect
    },
    props:{
        value:{
            type:String
        },
        openNewFolder:{
            type:Boolean,
            default:false
        }
    },
    setup(props,context){

        const disabled=ref(false)
        const showAddFolder=ref(props.openNewFolder)
        const folderValue=ref(props.value)

        const store = useStore()

        const user_folders=computed(()=>{
            return store.getters.getAllUserFolder
        })

        onBeforeMount(async()=>{
            await store.dispatch('handleChangeUserFolder')
        })

       

        const addFolder=()=>{
            
            folderValue.value='no folder selected'
            context.emit('selectChange','no folder selected')
            disabled.value=true
            
            showAddFolder.value=true
        }

        const handleInputChange=(value)=>{
            
            context.emit('newFolder',value)
        }

        const changeOption=(select_option)=>{
            
            context.emit('selectChange',select_option)
        }

     

        return{handleInputChange,
                disabled,
                showAddFolder,
                addFolder,
                changeOption,
                folderValue,
                user_folders
                }
    }
}
</script>

<style>

</style>