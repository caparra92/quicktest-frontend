<template>
  <div class="lg:grid-cols-2 flex-col bg-teal-600 p-0 m-0 w-screen h-screen lg:grid lg:grid-cols-2">
    <HomeView msg="Sign up or login for free" class="home lg:order-first sm:order-last sm:w-full h-full"/>
    <Navbar class="sm:order-first" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeView from '@/components/HomeView.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    HomeView,
    Navbar
  }
}
</script>
<style scoped>
.home {
  background-image: url('../assets/test.svg');
  background-size:contain;
  background-repeat: no-repeat;
  background-position-y: center;
}

</style>
