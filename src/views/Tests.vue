<template>
  <div class="flex flex-wrap w-full justify-center">
    <!--Question find panel -->

    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 bg-gray-100 shadow m-5 p-5 md:mr-2">
      <Loading v-if="loading" />
      <h1 class="text-gray-900 text-center p-5 font-bold">Questions</h1>
      <div class="w-full text-center items-center mx-auto">
        <form
          class="w-full flex flex-wrap md:p-2 bg-gray-200 mx-auto items-center"
          autocomplete="off"
          @submit.prevent="find"
          method="get"
        >
          <div class="md:inline md:items-center mb-6 mt-3 sm:mx-auto w-1/2">
            <div class="md:w-1/3 flex">
              <label class="custom-label flex">
                <span class="select-none pr-3 mr-3">Muiltiple Choice</span>
                <div class="bg-white shadow w-8 h-6 p-1 flex justify-center items-center mr-2">
                  <input id="multiple" type="checkbox" class="hidden" name="check" />
                  <svg
                    class="hidden w-4 h-4 text-green-600 pointer-events-none"
                    viewBox="0 0 172 172"
                  >
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
          </div>
          <div class="md:inline md:items-center mb-6 mt-3 mx-auto w-1/2">
            <div class="md:w-1/3 flex">
              <label class="custom-label flex">
                <span class="select-none pr-3 mr-3">Open question</span>
                <div class="bg-white shadow w-8 h-6 p-1 flex justify-center items-center mr-2">
                  <input id="open" type="checkbox" class="hidden" name="check" />
                  <svg
                    class="hidden w-4 h-4 text-green-600 pointer-events-none"
                    viewBox="0 0 172 172"
                  >
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
          </div>
          <div class="flex">
            <div class="w-4/5 px-2">
              <input
                :class="[ error ? 'w-full bg-gray-100 text-sm text-gray-800 transition border border-red-500 focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal h-10 shadow-xs' : 'w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal h-10 shadow-xs']"
                type="search"
                name="question"
                id="question"
                placeholder="Type question"
                v-model="question"
                ref="find_input"
              />
              <div class="relative search-icon w-4" style="top: -1.595rem;left: 0.55rem;">
                <svg
                  class="fill-current pointer-events-none text-gray-800 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  />
                </svg>
              </div>
            </div>
            <div class="w-1/5 mr-2">
              <button type="button" class="btn btn-teal" @click="find">Find</button>
            </div>
          </div>
        </form>
      </div>
      <div class="w-full bg-teal-400 my-5 border border-teal-400 rounded hover:bg-teal-500">
        <button
          type="button"
          class="w-full h-10 text-white font-bold focus:outline-none"
          @click="show"
        >
          <svg
            class="fill-current text-white h-10 w-10 mx-auto my-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>New Question
        </button>
      </div>
      <modal name="modalCard" height="auto" :adaptive="true" :scrollable="true">
        <div class="w-full text-center bg-teal-100 h-auto sm:w-full">
          <form
            method="post"
            class="w-full text-center p-3 pb-0 mb-0"
            @submit.prevent="newQuestion"
          >
            <h1 class="text-center py-5 font-bold text-2xl">New question</h1>
            <div class="flex w-full py-4 pr-3 items-center">
              <div class="w-1/3">
                <label for="Qtitle" class="font-semibold">Course</label>
              </div>
              <div class="w-2/3">
                <input
                  class="w-full pl-2 h-10 rounded border border-gray-700 shadow-xs pl-2"
                  type="text"
                  name="course"
                  id="course"
                  v-model="course"
                  placeholder="Question course"
                />
              </div>
            </div>
            <div class="flex w-full py-4 pr-3 items-center">
              <div class="w-1/3">
                <label for="type" class="font-semibold">Type</label>
              </div>
              <div class="w-2/3">
                <select
                  class="w-full h-10 rounded border border-gray-700 shadow-xs pl-2"
                  name="type"
                  v-model="type"
                >
                  <option disabled selected value>Select type...</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="open">Open Question</option>
                </select>
              </div>
            </div>
            <div class="flex w-full py-4 pr-3 items-center">
              <div class="w-1/3">
                <label for="level" class="font-semibold">Level</label>
              </div>
              <div class="w-2/3">
                <select
                  class="w-full h-10 rounded border border-gray-700 shadow-xs pl-2"
                  name="level"
                  v-model="level"
                >
                  <option disabled selected>Select level...</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="college">College</option>
                </select>
              </div>
            </div>
            <div class="flex w-full py-4 pr-3 items-center">
              <div class="w-1/3">
                <label for="description" class="font-semibold">Description</label>
              </div>
              <div class="w-2/3">
                <textarea
                  class="w-full rounded border border-gray-700 shadow-xs pl-2"
                  name="description"
                  id="description"
                  v-model="description"
                ></textarea>
              </div>
            </div>
            <transition name="fade">
              <MultipleChoice v-if="type == 'multiple'" @answer="retrieveAnswer($event)" />
              <Open v-if="type == 'open'" />
            </transition>
            <div
              class="w-full bg-teal-400 my-5 border border-teal-400 rounded hover:bg-teal-500 pb-0 mb-2"
            >
              <button
                type="button"
                class="w-full h-16 text-white font-semibold focus:outline-none"
                @click="newQuestion"
              >Add Question</button>
            </div>
          </form>
        </div>
      </modal>
      <!--QuestionCard -->
      <transition name="fade">
        <Alert
          v-if="error !== ''"
          class="w-full"
          color="red"
          title="Something error"
          :body="error"
        />
      </transition>
      <div class="w-full my-5 p-3" v-for="card in cards" v-bind:key="card.id">
        <QuestionCard
          :course="card.course"
          :type="card.type"
          :level="card.level"
          :description="card.description"
        >
          <button v-if="card.added == 1" class="btn bg-gray-100 border border-gray-200 mr-5" disabled>
            <svg class="w-6 h-6 text-green-600 pointer-events-none" viewBox="0 0 172 172">
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
          </button>
          <button v-else :class="{'btn btn-teal': '!added', 'btn bg-gray-100 border border-gray-200 mr-5': added}" @click.prevent="toTest(card.id)">{{ added }}</button>
        </QuestionCard>
      </div>
    </div>

    <!--test panel -->

    <div class="w-full sm:w-1/2 md:w-2/4 lg:w-2/4 xl:w-2/4 mb-4 bg-gray-100 shadow p-5 m-5 md:ml-2">
      <h1 class="text-gray-900 text-center font-bold p-5">New Test</h1>
      <div class="w-full text-center">
        <form class="w-full flex flex-wrap md:p-2">
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="title" class="font-semibold">Title</label>
            </div>
            <div class="w-4/5">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Test title"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="course" class="font-semibold">Course</label>
            </div>
            <div class="w-4/5">
              <input
                type="text"
                name="course"
                id="course"
                placeholder="Course name"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="signature" class="font-semibold">Signature</label>
            </div>
            <div class="w-4/5">
              <input
                type="text"
                name="signature"
                id="signature"
                placeholder="Signature"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="user" class="font-semibold">Teacher</label>
            </div>
            <div class="w-4/5">
              <input
                type="text"
                name="user"
                id="user"
                :value="authUser"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="test_date" class="font-semibold">Date</label>
            </div>
            <div class="w-4/5">
              <input
                type="date"
                name="test_date"
                id="test_date"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="description" class="font-semibold">Description</label>
            </div>
            <div class="w-4/5">
              <textarea
                rows="5"
                cols="20"
                name="description"
                id="description"
                placeholder="Test description"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
            </div>
          </div>
          <hr class="border-2 mx-auto my-5 border-dotted border-teal-600 text-xl w-2/3" />
          <h1 class="block w-full text-gray-900 text-center font-bold p-5">Questions</h1>
          <div class="w-full text-center">
            <!-- get questions here -->

            <div class="w-full my-5 p-3" v-for="question in questions" :key="question.id">
              <transition name="fade">
                <QuestionCard
                  class="w-full"
                  :course="question.course"
                  :type="question.type"
                  :level="question.level"
                  :description="question.description"
                />
              </transition>
            </div>
          </div>
          <div class="w-full text-center">
            <button type="button" class="float-right focus:outline-none border border-none">
              Print Test
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470.187 470.187">
                <path
                  d="M416.291 104.057h-43.644V10c0-5.523-4.477-10-10-10H107.54c-5.523 0-10 4.477-10 10v94.057H53.896c-21.947 0-39.802 17.855-39.802 39.802v180.006c0 5.523 4.477 10 10 10H97.54v126.322c0 5.523 4.477 10 10 10h255.107c5.523 0 10-4.477 10-10V333.865h73.446c5.523 0 10-4.477 10-10V143.859c0-21.947-17.855-39.802-39.802-39.802zM117.54 20h235.107v84.057H308.87V60.35c0-5.523-4.477-10-10-10s-10 4.477-10 10v43.707h-43.777V60.35c0-5.523-4.477-10-10-10s-10 4.477-10 10v43.707h-43.777V60.35c0-5.523-4.477-10-10-10s-10 4.477-10 10v43.707H117.54V20zm235.107 230.684H117.54v-11.458c0-10.919 8.883-19.802 19.802-19.802h195.503c10.919 0 19.802 8.883 19.802 19.802v11.458zm0 199.503H117.54V270.684h235.107v179.503zm83.446-136.322h-63.446v-74.639c0-21.947-17.855-39.802-39.802-39.802H137.342c-21.947 0-39.802 17.855-39.802 39.802v74.639H34.093V143.859c0-10.919 8.883-19.802 19.802-19.802h362.396c10.919 0 19.802 8.883 19.802 19.802v170.006z"
                />
                <path
                  d="M395.497 151.836c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5c0-5.789-4.71-10.5-10.5-10.5zM355.497 151.836c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5c0-5.789-4.71-10.5-10.5-10.5zM314.963 400.311h-159.74c-5.523 0-10 4.477-10 10s4.477 10 10 10h159.74c5.523 0 10-4.477 10-10s-4.477-10-10-10zM314.963 350.435h-159.74c-5.523 0-10 4.478-10 10 0 5.523 4.477 10 10 10h159.74c5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zM314.963 300.56h-79.87c-5.523 0-10 4.477-10 10s4.477 10 10 10h79.87c5.523 0 10-4.477 10-10s-4.477-10-10-10z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import QuestionCard from "@/components/QuestionCard.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import Open from "@/components/Open.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "Tests",
  components: {
    Loading,
    QuestionCard,
    MultipleChoice,
    Open,
    Alert
  },
  data() {
    return {
      authUser: localStorage.user,
      question: "",
      loading: false,
      cards: [],
      course: "",
      description: "",
      type: "",
      level: "",
      correctAnswer: "",
      questions: [],
      error: "",
      added: 'Add',
      disabled: false
    };
  },
  methods: {
    find() {
      this.cards = [];
      if (this.question == "") {
        this.error = "Search input cannot be empty";
        this.alertDimiss();
      } else {
        this.loading = true;
        this.$store
          .dispatch("findQuestions", {
            question: this.question
          })
          .then(response => {
            if (response.data == "") {
              this.error = "No results found";
              this.alertDimiss();
            } else {
              this.cards.push(...response.data);
            }
          })
          .catch(error => {
            this.error = error.response.data;
          })
          .finally(() => (this.loading = false));
      }
    },
    show() {
      this.$modal.show(
        "modalCard",
        {
          height: "auto"
        },
        {
          draggable: true
        }
      );
    },
    hide() {
      this.$modal.hide("modalCard");
    },
    retrieveAnswer(value) {
      this.correctAnswer = value;
    },
    newQuestion() {
      this.$store
        .dispatch("addQuestion", {
          course: this.course,
          description: this.description,
          type: this.type,
          level: this.level,
          answer: this.correctAnswer
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.hide());
    },
    toTest(id) {
      this.$store
        .dispatch("toTest", {
          id: id
        })
        .then(response => {
          this.questions.push(response.data);
          //event.target.disabled = true;
          this.added = 'Added'
          this.disabled = true
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      /* this.questions.push(question);
      event.target.disabled = true;
      event.target.textContent = 'Added'; */
    },
    alertDimiss() {
      setTimeout(() => {
        return (this.error = "");
      }, 3000);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>