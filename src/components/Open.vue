<template>
  <div class="w-full text-center">
    <div class="flex w-full py-4 pr-3 items-center">
      <div class="w-1/3">
        <label for="lines" class="font-semibold">Lines for answer</label>
      </div>
      <div class="w-2/3">
        <input
          class="w-full pl-2 pr-2 h-10 rounded border border-gray-700 shadow-xs"
          type="number"
          name="lines"
          v-model="lines_answer"
          @change="sendLines"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Open',
  data() {
    return {
      lines_answer: 10
    }
  },
  methods: {
    sendLines() {
      this.$emit('lines', this.lines_answer);
    }
  }
};
</script>

<style>
</style>