<template>
  <div class="flex p-2 m-2">
    <div class="flex justify-center items-center w-1/3">
      <label class="custom-label flex">
        <span class="select-none pr-3 mr-3">D</span>
        <div class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
          <input type="checkbox" class="hidden" name="check" @click="uncheck" />
          <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172">
            <g
              fill="none"
              stroke-width="none"
              stroke-miterlimit="10"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode:normal"
            >
              <path d="M0 172V0h172v172z" />
              <path
                d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                fill="currentColor"
                stroke-width="1"
              />
            </g>
          </svg>
        </div>
      </label>
    </div>
    <div class="w-2/3 text-center">
      <input
        class="rounded border border-gray-500 h-8 w-full pl-2"
        type="text"
        name="option"
        :placeholder="placeholderInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionInput",
  props: {
    placeholderInput: {
      type: String
    },
    chk: {
      type: Object,
      required: true
    }
  },
  methods: {
    uncheck() {
      this.$emit("uncheck", this.chk.id);
    }
  }
};
</script>

<style>
</style>