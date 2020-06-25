<template>
  <div class="w-full text-center shadow rounded bg-gray-200 border border-b-2">
    <div class="w-full flex">
      <div class="w-3/4 p-5">
        <p class="font-semibold text-2xl text-left">{{ course }}</p>
      </div>
      <div class="w-1/4 py-5 mx-auto my-0 text-center">
        <slot name="button"></slot>
      </div>
    </div>
    <div class="w-full flex p-3 border border-gray bg-white">
      <div class="w-1/2 text-left px-2">
        <h1 class="font-semibold">Type</h1>
      </div>
      <div class="w-1/2 text-right px-2">
        <p>{{type | toUpper }}</p>
      </div>
    </div>
    <div class="w-full flex p-3 border border-gray bg-white">
      <div class="w-1/2 text-left px-2">
        <h1 class="font-semibold">Level</h1>
      </div>
      <div class="w-1/2 text-right px-2">
        <p>{{level | toUpper}}</p>
      </div>
    </div>
    <div class="w-full p-3 border border-gray bg-white">
      <div class="w-full text-left px-2">
        <h1 class="font-semibold">Description</h1>
      </div>
      <div class="w-full p-3 mt-2 text-left">
        <p>{{description}}</p>
      </div>
    </div>
    <slot name="tags"></slot>
    <slot name="answers"></slot>
    <slot name="lines"></slot>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    course: {
      type: String,
      default: "Question title"
    },
    type: {
      type: String,
      default: "Question type"
    },
    description: {
      type: String,
      default: "Question description"
    },
    level: {
      type: String,
      default: "Question level"
    },
    user: {
      type: String,
      default: "Created by"
    }
  },
  filters: {
    toUpper(value) {
      return value.toUpperCase();
    },
    subStr(value) {
      return value.substr(0, 3);
    }
  }
};
</script>

<style>
</style>