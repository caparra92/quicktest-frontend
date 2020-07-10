<template>
  <div class="flex flex-wrap w-full justify-center" :class="{'opacity-50' : loading}">
    <Loading v-if="loading"/>
    <!--Question find panel -->
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 bg-gray-100 shadow m-5 p-5 md:mr-2">
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
                  <input
                    value="multiple"
                    type="checkbox"
                    class="hidden"
                    name="check"
                    v-model="typeQuestion"
                  />
                  <IconCheck class="hidden w-4 h-4 text-green-600 pointer-events-none" />
                </div>
              </label>
            </div>
          </div>
          <div class="md:inline md:items-center mb-6 mt-3 mx-auto w-1/2">
            <div class="md:w-1/3 flex">
              <label class="custom-label flex">
                <span class="select-none pr-3 mr-3">Open question</span>
                <div class="bg-white shadow w-8 h-6 p-1 flex justify-center items-center mr-2">
                  <input
                    value="open"
                    type="checkbox"
                    class="hidden"
                    name="check"
                    v-model="typeQuestion"
                  />
                  <IconCheck class="hidden w-4 h-4 text-green-600 pointer-events-none" />
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
            ref="formNewQuestion"
          >
            <h1 class="text-center py-5 font-bold text-2xl">New question</h1>
            <div class="flex w-full py-4 pr-3 items-center">
              <div class="w-1/3">
                <label for="Qthis." class="font-semibold">Course</label>
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
              <MultipleChoice v-if="type == 'multiple'" @answers="retrieveAnswer($event)" />
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
          <template v-slot:button>
            <button
              :class="[{ 'btn bg-gray-100 border border-gray-200 mr-5 hover:bg-gray-100 pointer-events-none text-gray-500 outline-none': card.added }, 'btn btn-teal']"
              @click.prevent="toTest(card)"
            >
              {{ card.added == 1 ? '' : 'Add' }}
              <IconCheck
                v-if="card.added"
                class="w-6 h-6 text-green-600 pointer-events-none outline-none"
              />
            </button>
          </template>
          <template v-slot:tags>
            <div class="px-6 py-4 bg-white">
              <span
                class="inline-block bg-teal-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >#{{card.type}}</span>
              <span
                class="inline-block bg-teal-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >#{{card.level}}</span>
              <span
                class="inline-block bg-teal-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >#{{card.course}}</span>
            </div>
          </template>
          <template v-slot:answers>
            <div class="w-full my-5" v-for="answer in card.answers" v-bind:key="answer.id">
              <div
                class="flex w-full p-3 border border-gray rounded-full"
                :class="[{'bg-teal-100': answer.is_correct}, 'bg-white']"
              >
                <p class="w-1/5 font-semibold">{{ answer.letter }}</p>
                <p class="w-4/5 text-left">{{ answer.description }}</p>
                <IconCheck class="w-5 h-5 text-green-600 mx-auto" v-if="answer.is_correct" />
              </div>
            </div>
          </template>
        </QuestionCard>
      </div>
    </div>

    <!--test panel -->

    <div class="w-full sm:w-1/2 md:w-2/4 lg:w-2/4 xl:w-2/4 mb-4 bg-gray-100 shadow p-5 m-5 md:ml-2">
       <transition name="fade">
        <Alert
          v-if="testAdded"
          class="w-full"
          color="teal"
          title="Success"
          body="Test created successfully"
        />
      </transition>
      <h1 class="text-gray-900 text-center font-bold p-5">New Test</h1>
      <div class="w-full text-center">
        <p class="bg-red-100 text-red-500 m-2" v-for="error in errors" :key="error.id">{{ error[0] }}</p>
        <form class="w-full flex flex-wrap md:p-2" method="post" @submit.prevent="sendTest" @load="getSignatures">
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
                v-model="title"
                :class="{'border border-red-500': errors.title !== undefined}"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
              <span v-if="errors.length > 0" class="text-red-500 text-left w-full text-xs">This field is required</span>
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
                v-model="testCourse"
                :class="{'border border-red-500': errors.course !== undefined}"
                placeholder="Course name"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
              <span v-if="errors.length > 0" class="text-red-500 text-left w-full text-xs">This field is required</span>
            </div>
          </div>
          <div class="w-full flex mb-2">
            <div class="w-1/5 pt-2">
              <label for="signature" class="font-semibold">Signature</label>
            </div>
            <div class="w-4/5">
              <select
                name="signature"
                v-model="signature"
                :class="{'border border-red-500': errors.signature !== undefined}"
                placeholder="Signature"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              >
                <option disabled selected>Select signature...</option>
                <option v-for="signature in signatures" :key="signature.id" :value="signature.id">{{signature.name}}</option>
              </select>
              <span v-if="errors.length > 0" class="text-red-500 text-left w-full text-xs">This field is required</span>
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
                :disabled="true"
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
                v-model="date"
                :class="{'border border-red-500': errors.date !== undefined}"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
              <span v-if="errors.length > 0" class="text-red-500 text-left w-full text-xs">This field is required</span>
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
                v-model="testDescription"
                placeholder="Test description"
                :class="{'border border-red-500': errors.description !== undefined}"
                class="w-full h-7 border focus:outline-none focus:border-gray-700 rounded shadow-xs pl-2"
              />
              <span v-if="errors.length > 0" class="text-red-500 text-left w-full text-xs">This field is required</span>
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
                >
                  <template v-slot:button>
                    <button class="border-none mr-2 w-12" @click.prevent="toCard(question)">
                      <Trash />
                    </button>
                  </template>
                  <template v-slot:answers>
                    <div
                      class="w-full my-5"
                      v-for="answer in question.answers"
                      v-bind:key="answer.id"
                    >
                      <div
                        class="flex w-full p-3 border border-gray rounded-full"
                        :class="[{'bg-teal-100': answer.is_correct}, 'bg-white']"
                      >
                        <p class="w-1/5 font-semibold">{{ answer.letter }}</p>
                        <p class="w-4/5 text-left">{{ answer.description }}</p>
                        <IconCheck class="w-5 h-5 text-green-600 mx-auto" v-if="answer.is_correct" />
                      </div>
                    </div>
                  </template>
                  <template v-slot:lines v-if="question.type == 'open'">
                    <Open />
                  </template>
                </QuestionCard>
              </transition>
            </div>
          </div>
          <div class="w-full text-center">
            <button
              type="button"
              class="float-left focus:outline-none border border-none ml-5 pl-5 h-10"
              @click="sendTest(questions)"
            >
              <Disk />
            </button>
            <button type="button" class="float-right focus:outline-none border border-none w-12">
              <Printer/>
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
import IconCheck from "@/components/IconCheck.vue";
import Printer from "@/components/Printer.vue";
import Disk from "@/components/Disk.vue";
import Trash from "@/components/Trash.vue";

export default {
  name: "Tests",
  components: {
    Loading,
    QuestionCard,
    MultipleChoice,
    Open,
    Alert,
    IconCheck,
    Printer,
    Disk,
    Trash
  },
  mounted() {
    this.getSignatures();
  },
  data() {
    return {
      authUser: localStorage.user,
      question: "",
      typeQuestion: [],
      loading: false,
      cards: [],
      course: "",
      description: "",
      type: "",
      level: "",
      correctAnswer: "",
      questions: [],
      error: "",
      added: "Add",
      disabled: false,
      options: [],
      //TEST
      title: "",
      testCourse: "",
      signatures: [],
      signature: "",
      date: "",
      testDescription: "",
      testAdded: false,
      errors: []
    };
  },
  methods: {
    find() {
      this.cards = [];
      if (this.question == "") {
        this.error = "Search input cannot be empty";
        this.alertDimiss(this.error);
      } else {
        this.loading = true;
        this.$store
          .dispatch("findQuestions", {
            question: this.question,
            type: JSON.stringify(this.typeQuestion)
          })
          .then(response => {
            if (response.data == "") {
              this.question = "";
              this.error = "No results found";
              this.alertDimiss(this.error);
            } else {
              this.question = "";
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
      this.options = value;
      console.log(this.options);
    },
    newQuestion() {
      this.$store
        .dispatch("addQuestion", {
          course: this.course,
          description: this.description,
          type: this.type,
          level: this.level,
          answers: JSON.stringify(this.options)
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.hide());
    },
    toTest(card) {
      this.$store
        .dispatch("toTest", {
          id: card.id
        })
        .then(response => {
          this.questions.push(response.data[0]);
          event.target.textContent = "";
          this.added = "";
          card.added = true;
          this.disabled = true;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    toCard(question) {
      this.$store
        .dispatch("toCard", {
          id: question.id
        })
        .then(response => {
          let index = this.questions.indexOf(question);
          this.questions.splice(index, 1);
          for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == question.id) {
              this.cards[i].added = false;
            }
          }
          console.log(response);
          console.log(question.id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    alertDimiss(value) {
      
      if(typeof(value) === 'boolean') {
        setTimeout(() => {
          return this.testAdded = false;
      }, 3000);
        } else {
        setTimeout(() => {
          return this.error = "";
      }, 3000);
        }
    },
    sendTest(questions) {
      this.loading = true;
      /* if (!this.title && !this.testCourse && !this.signature && !this.date && !this.description) */ 
      this.$store
        .dispatch("newTest", {
          title: this.title,
          course: this.testCourse,
          signature: this.signature,
          date: this.date,
          description: this.testDescription,
          user_id: localStorage.user_id,
          questions: JSON.stringify(questions)
        })
        .then(response => {
          this.testAdded = true;
          this.errors = [];
          this.title =  "";
          this.testCourse = "";
          this.signature =  "";
          this.date =  "";
          this.testDescription =  "";
          this.questions =  [];
          this.disabled = true;
          this.alertDimiss(this.testAdded);
          console.log(response);
        })
        .catch(error => {
          console.log(error.response.data.errors)
          this.errors = error.response.data.errors;
          console.log(this.errors.date)
        })
        .finally(() => (this.loading = false));
        
    },
    getSignatures() {
      this.$store
        .dispatch("getSignature")
        .then(response => {
          this.signatures.push(...response.data);
          console.log(response);
          console.log(this.signatures);
        })
        .catch(error => {
          console.log(error);
        });
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