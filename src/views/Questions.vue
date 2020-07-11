<template>
  <div class="text-gray-900 tracking-wider leading-normal w-full">
    <div class="container w-full md:w-4/5 xl:w-3/5 mx-auto px-2">
      <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Course</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Level</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question.id">
              <td class="border px-4 py-2">{{question.course}}</td>
              <td class="border px-4 py-2">{{question.description}}</td>
              <td class="border px-4 py-2">{{question.type}}</td>
              <td class="border px-4 py-2">{{question.level}}</td>
              <td class="border px-4 py-2 text-center flex">
                <button class="btn btn-green m-2">Edit</button>
                <button class="btn btn-red m-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: []
    }
  },
  name: 'Questions',
  mounted() {
    this.getQuestions()
  },
  methods: {
    getQuestions() {
      this.$store.dispatch('getQuestions')
        .then(response => {
          this.questions.push(...response.data)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>

<style>

</style>