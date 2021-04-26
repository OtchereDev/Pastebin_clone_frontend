<template>
  <nav class="w-full px-6 py-3 flex justify-between text-gray-200 bg-gray-800 items-center">
      <div class="flex items-center">
          <h1 class="font-semibold text-xl">
              PasteBin
          </h1>
          <button class='px-2 py-1 bg-green-600 rounded-lg ml-7 flex cursor-pointer'>
            <div class='flex justify-center items-center mr-1' >
                <ion-icon  name="eye" class="text-2xl"></ion-icon>
            </div>
              <span>
                  Paste
              </span>
          </button>
      </div>

      <div class='w-5/12 lg:w-2/12 flex items-center' v-if="true">
          <button @click="handleLogin" class='px-2 py-1 border border-gray-100 rounded-lg mr-5 focus:outline-none'>
              Log In
          </button>
          <button @click="handleSignUp"  class='px-2 py-1 bg-gray-100 text-gray-800 rounded-lg focus:outline-none'>
              Sign Up
          </button>
      </div>
      <div class="relative" v-else>
          <TheNavBarMenu :toggleMenu='showMenu' @closeMenu='menuLeave' />
        <div class="w-12 h-12 rounded-full bg-white" @mouseenter="menuEnter"  >
            <!-- Avatar goes here -->
        </div>
      </div>
  </nav>
</template>

<script>
import TheNavBarMenu from '@/components/TheNavBarMenu'
import { ref } from '@vue/reactivity'
import {useRouter} from 'vue-router'
export default {
    name:'TheNavBar',
    components:{
        TheNavBarMenu
    },

    setup(){
        const showMenu= ref(false)
        const router = useRouter()

        const menuEnter=()=>{
            showMenu.value=true
            
        }

        const menuLeave=()=>{
            showMenu.value=false
        }

        const handleLogin=()=>{

            if(router.currentRoute.value.name=='Auth'){
                router.go({
                    name:'Auth',
                    params:{
                        signup:false
                    }
                })
            }else{

                router.push({
                    name:'Auth',
                    params:{
                        signup:false
                    }
                })
            }
        }

        const handleSignUp=()=>{
            if(router.currentRoute.value.name=='Auth'){
                router.go({
                    name:'Auth',
                    params:{
                        signup:true
                    }
                })
            }else{

                router.push({
                    name:'Auth',
                    params:{
                        signup:true
                    }
                })
            }
        }

        return {menuLeave,menuEnter,showMenu,handleLogin,handleSignUp}
    }
}
</script>

<style>

</style>