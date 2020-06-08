<template>
  <div class="flex-col">
    <Navbar/>
    <FormSignUp/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormSignUp from '@/components/FormSignUp.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Signup',
  components: {
    FormSignUp,
    Navbar
  }
}
</script>