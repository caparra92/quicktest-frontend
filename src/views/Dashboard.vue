<template>
  <div class="font-sans leading-normal tracking-normal">
    <DashNav/>
    <DashContent/>
  </div>
</template>
<script>
import DashNav from '@/components/DashNav'
import DashContent from '@/components/DashContent'

export default {
  components: {
    DashNav,
    DashContent
  },
  data() {
    return {
      authUser: localStorage.user
    }
  },
  created() {
    console.log(localStorage);
  }
};
</script>