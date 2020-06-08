<template>
  <div class="p-8 sm:p-12 mx-auto my-0">
    <h2 class="text-center font-bold text-lg p-5">Sign up</h2>
    <form class="w-full max-w-sm bg-white p-5 border border-gray-400 rounded mx-auto" autocomplete="off" @submit.prevent="signIn" method="post">
      <div class="md:flex md:items-center mb-6 mt-5">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >Name</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="name"
            placeholder="Your name"
            v-model="name"
          />
        </div>
      </div>
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
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="password_confirm"
          >Confirm password</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-6 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="password_confirmation"
            type="password"
            placeholder="Confirm password"
            v-model="password_confirmation"
          />
        </div>
      </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="path"
            >Image</label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
              id="path"
              type="text"
              placeholder="image path"
              v-model="path"
            />
          </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="btn btn-teal"
            type="button"
            @click="signIn"
          >Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSignUp",
  props: {},
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      path: ''
    }
  },
  mounted(){
    console.log('componet mounted');
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("signUp", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          path: this.path
        })
        .then(response => {
          this.$router.push({ name: "login" });
          console.log(response)
        })
        .catch(error => {
          this.error = error.response.data;
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
