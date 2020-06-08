<template>
  <div
    id="nav"
    class="bg-teal-100 sm:items-center text-center"
    :class="{ 'p-0 sm:p-0': this.$route.path == '/' }"
  >
    <div
      class="lg:right-0 lg:top-0 lg:absolute sm:p-8 pt-2 mt-2 sm:items-center"
      :class="{ 'lg:pb-0 sm:pb-0': this.$route.path == '/' }"
    >
      <router-link to="/" class="p-2 border-transparent border-b-2 hover:border-teal-500">Home</router-link>
      <router-link to="/about" class="p-2 border-transparent border-b-2 hover:border-teal-500">About</router-link>
      <router-link
        to="/signup"
        v-if="this.$route.path !== '/dashboard'"
        class="p-2 border-transparent border-b-2 hover:border-teal-500"
      >Sign up</router-link>
      <router-link
        to="/login"
        v-if="this.$route.path !== '/dashboard'"
        class="p-2 border-transparent border-b-2 hover:border-teal-500"
      >Login</router-link>
      <router-link
        to="/logout"
        v-if="this.$route.path == '/dashboard'"
        class="p-2 border-transparent border-b-2 hover:border-teal-500"
      >Logout</router-link>
    </div>
  </div>
</template>
