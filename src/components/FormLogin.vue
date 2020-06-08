<template>
  <div class="p-8 sm:p-12 mx-auto my-0">
    <transition name="fade">
      <Alert v-if="error !== ''" color="red" title="Option added successfully" :body="JSON.stringify(error.message)"/>
    </transition>
    <Loading v-if="loading"/>
    <h2 class="text-center font-bold text-lg p-5">Login</h2>
    <form
      class="w-full max-w-sm bg-white p-5 border border-gray-400 rounded mx-auto"
      autocomplete="off"
      @submit.prevent="login"
      method="post"
    >
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="email"
          >Email</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="email"
            type="email"
            placeholder="Your email"
            v-model="email"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="password"
          >Password</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="password"
            type="password"
            placeholder="Your password"
            v-model="password"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button class="btn btn-teal" type="button" @click="login">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: "FormLogin",
  components: {
    Loading,
    Alert 
  },
  props: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  },
  mounted() {
    console.log("componet mounted");
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("retrieveToken", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "dashboard" });
          console.log(response);
        })
        .catch(error => {
          this.error = error.response.data;
          this.alertDimiss();
        })
        .finally(() => (this.loading = false));
    },
    alertDimiss(){
      setTimeout(() => {
        return this.error = '';
      }, 3000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
