<template>
    <div class='flex items-center'>
        <AppSelect :selectOption='["no folder selected"]' title='Paste Folder' />
        <div>
            <div class="w-8 h-8 bg-gray-50 ml-3 rounded-full flex justify-center items-center">
                <div class='flex justify-center items-center' >
                    <ion-icon  name="add" class="text-2xl text-blue-700 font-bold"></ion-icon>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue'
export default {
    components:{
        AppSelect
    }
}
</script>

<style>

</style>