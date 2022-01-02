<template>
  <!-- <nav class="w-full px-6 py-3 flex justify-between  shadow-2xl items-center"> -->
  <nav
    :class="
      !this.$store.getters.getUserPastePrefence.nightMode
        ? 'text-gray-200 bg-blue-800'
        : 'text-gray-200 bg-gray-900'
    "
    class="w-full px-6 py-3 flex justify-between shadow-2xl items-center"
  >
    <div class="flex items-center">
      <router-link to="/">
        <h1 class="font-semibold text-xl">PasteBin</h1>
      </router-link>
      <button
        @click="handleCreatePaste"
        class="
          px-2
          py-1
          bg-green-600
          rounded-lg
          ml-7
          flex
          cursor-pointer
          focus:outline-none
        "
      >
        <div class="flex justify-center items-center mr-1">
          <ion-icon name="add" class="text-2xl"></ion-icon>
        </div>
        <span> Paste </span>
      </button>
    </div>

    <div class="w-5/12 lg:w-2/12 flex items-center" v-if="!userAvailable">
        <button
          @click="handleLogin"
          v-if="$router.currentRoute.value.name != 'Auth'"
          class="
            px-2
            py-1
            border border-gray-100
            rounded-lg
            mr-5
            focus:outline-none
          "
        >
          Log In
        </button>
        <button
          @click="handleSignUp"
          v-if="$router.currentRoute.value.name != 'Auth'"
          class="
            px-2
            py-1
            bg-gray-100
            text-gray-800
            rounded-lg
            focus:outline-none
          "
        >
          Sign Up
        </button>
    </div>
    <div class="relative" v-else>
      <TheNavBarMenu :toggleMenu="showMenu" @closeMenu="menuLeave" />
      <div
        id="profileIcon"
        class="
          w-12
          h-12
          rounded-full
          bg-white
          flex
          justify-center
          items-center
          text-black
        "
        @mouseenter="menuEnter"
      >
        <!-- Avatar goes here -->
        <ion-icon name="person-outline" class="text-4xl"></ion-icon>
      </div>
    </div>
  </nav>
</template>

<script>
import TheNavBarMenu from "@/components/TheNavBarMenu";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "TheNavBar",
  components: {
    TheNavBarMenu,
  },

  setup() {
    const store = useStore();

    const showMenu = ref(false);
    const router = useRouter();
    const userAvailable = computed(() => {
      return store.getters.getUser;
    });

    const menuEnter = () => {
      showMenu.value = true;
    };

    window.addEventListener("click", (e) => {
      // take out the nav menu when the user clicks outside of it

      const profileIcon = document.getElementById("profileIcon");
      if (profileIcon !== null) {
        if (!Array.from(profileIcon.children).includes(e.target)) {
          showMenu.value = false;
        }
      }
    });

    const menuLeave = () => {
      showMenu.value = false;
    };

    const handleCreatePaste = () => {
      router.push({
        name: "CreatePasteBin",
      });
    };

    const handleLogin = () => {
      if (router.currentRoute.value.name == "Auth") {
        router.go({
          name: "Auth",
          params: {
            signup: false,
          },
        });
      } else {
        router.push({
          name: "Auth",
          params: {
            signup: false,
          },
        });
      }
    };

    const handleSignUp = () => {
      console.log("aaa:", router.currentRoute.value.name);
      if (router.currentRoute.value.name == "Auth") {
        // router.go({
        //     name:'Auth',
        //     params:{
        //         signup:true
        //     }
        // })

        router.replace({
          name: "Auth",
          params: {
            signup: true,
          },
        });
      } else {
        router.push({
          name: "Auth",
          params: {
            signup: true,
          },
        });
      }
    };

    return {
      menuLeave,
      menuEnter,
      showMenu,
      handleLogin,
      handleSignUp,
      handleCreatePaste,
      userAvailable,
    };
  },
};
</script>

<style>
</style>