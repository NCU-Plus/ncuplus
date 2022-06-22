<template>
  <nav
    class="flex items-center justify-between bg-blue-400 p-3 text-white fixed w-full z-50 h-50"
  >
    <NuxtLink class="lg:ml-48 p-2 mr-4 inline-flex items-center" to="/"
      >NCU+</NuxtLink
    >
    <div class="flex lg:hidden">
      <transition name="phone-nav-fade">
        <div v-show="showPhoneNavMenu" class="flex justify-center items-center">
          <div class="flex justify-center items-center">
            <NuxtLink class="p-1 hover:bg-white hover:text-black" to="/courses"
              >課程</NuxtLink
            >
            <NuxtLink class="p-1 hover:bg-white hover:text-black" to="/login"
              >登入</NuxtLink
            >
          </div>
        </div>
      </transition>
      <button
        @click="showPhoneNavMenu = !showPhoneNavMenu"
        class="text-white p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <font-awesome-icon
          class="hover:text-slate-400 transition-colors duration-300"
          :icon="['fas', 'bars']"
        />
      </button>
    </div>
    <div
      class="mr-48 hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
    >
      <div
        class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
      >
        <NuxtLink
          class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded items-center justify-center hover:bg-white hover:text-black"
          to="/courses"
          >課程</NuxtLink
        >
        <NuxtLink
          class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded items-center justify-center hover:bg-white hover:text-black"
          to="/login"
          >登入</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showPhoneNavMenu = ref(false);
</script>

<style scoped>
.phone-nav-fade-enter-active {
  transition: all 0.3s ease-out;
}

.phone-nav-fade-leave-active {
  transition: all 0.3s ease-out;
}

.phone-nav-fade-enter-from,
.phone-nav-fade-leave-to {
  opacity: 0;
}
</style>
