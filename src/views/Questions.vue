<template>
  <div class="text-gray-900 tracking-wider leading-normal w-full">
    <div class="container w-full md:w-4/5 xl:w-3/5 mx-auto px-2">
      <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <a-table
          class="w-full border "
          :columns="columns"
          :rowKey="question => question.id"
          :dataSource="questions"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, question">
            <a href="#" title="Show answers" @click="showAnswers(question)"><a-icon type="info-circle-o" :style="{ color: '#2ab884' }"/></a>
            <a-divider type="vertical" />
            <a href="#" title="Edit"><a-icon type="edit" :style="{ color: '#f5b642' }"  /></a>
            <a-divider type="vertical" />
            <a-popconfirm
              v-if="questions.length"
              title="Sure to delete?"
              @confirm="() => onDelete(question)">
              <a href="#" title="Delete"><a-icon type="delete" :style="{ color: '#f55d42' }"  /></a>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </div>
    <!-- start modal answers -->
      <modal name="modalCard" height="auto" :adaptive="true" :scrollable="true">
        <h2 class="p-2 pl-5 m-2">Answers</h2>
        <div class="w-full text-center h-auto sm:w-full">
          <!-- <MultipleChoice @answers="retrieveAnswer($event)" /> -->
          <div class="w-full my-5 p-2 px-5" v-for="answer in answers" v-bind:key="answer.id">
              <div
                class="flex w-full p-3 border border-gray rounded-full"
                :class="[{'bg-teal-100': answer.is_correct}, 'bg-white']"
              >
                <p class="w-1/5 font-semibold">{{ answer.letter }}</p>
                <p class="w-4/5 text-left">{{ answer.description }}</p>
                <IconCheck class="w-5 h-5 text-green-600 mx-auto" v-if="answer.is_correct" />
              </div>
          </div>
        </div>
      </modal>
    <!-- end modal answers -->
  </div>
</template>

<script>
/* import MultipleChoice from "@/components/MultipleChoice.vue" */
import IconCheck from '@/components/IconCheck.vue'

const columns = [
        {
          title: "Course",
          dataIndex: "course",
          key: "course",
          width: '20%',
          sorter: (a, b) => a.course.length - b.course.length
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description"
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          filters: [
            { text: 'Multiple', value: 'multiple' },
            { text: 'Open', value: 'open' },
          ],
          onFilter: (value, question) => question.type.indexOf(value) === 0,
          sorter: (a, b) => a.type.length - b.type.length,
        },
        {
          title: "Level",
          dataIndex: "level",
          key: "level",
          filters: [
            { text: 'Primary', value: 'primary' },
            { text: 'Secondary', value: 'secondary' },
            { text: 'College', value: 'college' },
          ],
          onFilter: (value, question) => question.level.indexOf(value) === 0,
        },
        {
          title: "Actions",
          dataIndex: "actions",
          key: "actions",
          scopedSlots: { customRender: 'action' },
        }
      ]

export default {
  components: {
    /* MultipleChoice, */
    IconCheck
  },
  data() {
    return {
      loading: false,
      pagination: {},
      columns,
      questions: [],
      answers: []
    };
  },
  name: "Questions",
  mounted() {
    this.getQuestions();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      console.log('params', pagination, filters, sorter);
    },
    getQuestions() {
      this.loading = true
      this.$store
        .dispatch("getQuestions")
        .then(response => {
          this.questions.push(...response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.loading = false);
    },
    onDelete(question) {
      this.$store
      .dispatch("deleteQuestion", {id: question.id})
      .then(response => {
        let index = this.questions.indexOf(question);
        this.questions.splice(index, 1);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    },
    showAnswers(question) {
      this.$modal.show(
        "modalCard",
        {
          height: "auto"
        },
        {
          draggable: true
        }
      );
      this.answers = question.answers
    }
  }
};
</script>

<style>
</style>