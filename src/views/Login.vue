<template>
  <div class="flex-col">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Navbar/>
    <FormLogin/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormLogin from '@/components/FormLogin.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Login',
  components: {
    FormLogin,
    Navbar
  }
}
</script>