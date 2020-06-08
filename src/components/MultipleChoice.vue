<template>
  <div class="w-full text-center">
    <transition name="fade">
      <Alert v-if="checked" color="teal" title="Option added successfully"/>
    </transition>
    <div class="w-full" v-for="option in options" :key="option" ref="content">
      <div class="flex p-2 m-2">
        <div class="flex justify-center items-center w-1/3">
          <label class="custom-label flex">
            <span class="select-none pr-3 mr-3">{{ option }}</span>
            <div class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
              <input type="checkbox" class="hidden" name="check" @click="unCheckAll" :ref="option" :id="option"/>
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
            :name="'option'+option"
            :placeholder="'Option '+ option"
            :ref="'option'+option"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row-reverse">
      <button
        class="btn btn-teal flex w-8 h-8 rounded-full mr-2 p-0 border border-none focus:outline-none"
        @click.prevent="removeOption"
      >
        <svg
          class="fill-current text-white h-6 w-6 mx-auto my-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 496"
        >
          <path
            d="M248 0C111.033 0 0 111.033 0 248c.154 136.903 111.097 247.846 248 248 136.967 0 248-111.033 248-248S384.967 0 248 0zm0 480C119.87 480 16 376.13 16 248c.146-128.07 103.93-231.854 232-232 128.13 0 232 103.87 232 232S376.13 480 248 480z"
          />
          <path d="M400 240H96a8 8 0 000 16h304a8 8 0 000-16z" />
        </svg>
      </button>
      <button
        class="btn btn-teal flex w-8 h-8 rounded-full mr-2 p-0 focus:outline-none"
        @click.prevent="addOption"
      >
        <svg
          class="fill-current text-white h-6 w-6 mx-auto my-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: "MultipleChoice",
  components: {
    Alert
  },
  data() {
    return {
      checked: false,
      newOption: false,
      options: ["A", "B", "C", "D"],
      charAdd: 68,
      answer: ''
    };
  },
  methods: {
    unCheckAll() {
      
      const opt = this.options;
      let val = event.target.id;
      for (let i = 0; i < opt.length; i++) {
        if (event.target.checked) {
          this.$refs[opt[i]][0].checked = false;
          event.target.checked = true;
          //adding class to selected option
          this.$refs['option'+opt[i]][0].className = 'rounded border border-gray-500 h-8 w-full pl-2';
          this.$refs['option'+val][0].className = 'rounded border border-gray-500 h-8 w-full pl-2 bg-teal-100 border border-teal-500';
          this.checked = true;
          this.alertDimiss();
          //sending value of selected option to parent component
          this.answer = this.$refs['option'+val][0].value;
          this.$emit('answer', this.answer)
        } else {
          this.$refs['option'+val][0].className = 'rounded border border-gray-500 h-8 w-full pl-2';
        }
      }

      //let check = event.target
      /*  const content = this.$refs.content.childNodes;
      //console.log(content);
      content.forEach(element => {
        let el =
          element.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        if (event.target.checked) {
          //event.target.nextSibling.classList.remove("hidden");
          el.checked = false;
          event.target.checked = true;
        } else {
          event.target.checked = false;
          element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].checked = false;
        }
      }); */
    },
    addOption() {
      if (this.options.length <= 5) {
        this.charAdd += 1;
        this.options.push(String.fromCharCode(this.charAdd));
      } else {
        alert("This may have a maximum of 6 responses");
      }
    },
    removeOption() {
      if (this.options.length >= 3) {
        this.charAdd -= 1;
        this.options.pop();
      } else {
        alert("It should have at least 2 answers");
      }
    },
    alertDimiss(){
      setTimeout(() => {
        return this.checked = false;
      }, 3000);
    }
  },
  computed: {
    
  }
};
</script>

<style>
.custom-label input:checked + svg {
  display: block !important;
}
.custom-label {
  cursor: pointer !important;
}
.selected {
  background-color: rgb(83, 218, 218);
  border-color: teal;
}
</style>