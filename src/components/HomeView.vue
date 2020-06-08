<template>
  <div class="w-full text-center">
    <div class="text-center">
      <!-- <IconTest/> -->
      <h1 class="text-white text-center lg:text-4xl sm:text-5xl p-5">Quicktest</h1>
      <h2 class="text-white text-center lg:text-2xl sm:text-4xl p-5">{{ msg }}</h2>
    </div>
    <div class="flex items-center justify-center bottom-0 p-5 mx-auto my-0">
       <Playstore class="cursor-pointer"/>
    </div>
  </div>
</template>

<script>
import Playstore from '@/components/Playstore.vue'
/* import IconTest from '@/components/IconTest.vue' */

export default {
  name: 'HomeView',
  components: {
    Playstore,
    /* IconTest */
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
