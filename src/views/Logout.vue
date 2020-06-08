<template>
  <div class="logout">
    <Loading v-if="loading"/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch("destroyToken").then(response => {
        console.log(response);
      this.$router.push({ name: "login" })
    }).finally(() => (this.loading = false));
  }
};
</script>