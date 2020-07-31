import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/auth/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            console.log(response)
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            localStorage.setItem('user', response.data.user_logged.name)
            localStorage.setItem('user_id', response.data.user_logged.id)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    destroyToken(context) {

      if (context.getters.loggedIn) {

        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8000/api/auth/logout', '', {
            headers: { Authorization: "Bearer " + context.state.token }
          })
            .then(response => {
              //console.log(response)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')

              resolve(response)
            })
            .catch(error => {
              //console.log(error)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')

              reject(error)
            })
        })

      }
    },
    signUp(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/auth/signup', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
          path: credentials.path
        })
          .then(response => {
            console.log(response)
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            console.log(credentials)
            console.log(error)
            reject(error)
          })
      })
    },
    findQuestions(_, value) {

      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/api/questions/${value.question}/${value.type}`)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    addQuestion(_, value) {
      return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/api/questions/new`, {
          course: value.course,
          description: value.description,
          type: value.type,
          level: value.level,
          user_id: localStorage.user_id,
          lines_answer: value.lines_answer,
          answers: value.answers
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    toTest(_, value) {
      return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8000/api/questions/add/${value.id}`)
          .then(response => {
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            reject(error)
            console.log(error);
          })
      })
    },
    toCard(_, value) {
      return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8000/api/questions/remove/${value.id}`)
          .then(response => {
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            reject(error)
            console.log(error);
          })
      })
    },
    newTest(_, value) {
      return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/api/tests/new`, {
          title: value.title,
          course: value.course,
          signature: value.signature,
          date: value.date,
          description: value.description,
          user_id: value.user_id,
          category_id: value.signature,
          questions: value.questions
        })
          .then(response => {
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            reject(error)
            console.log(error);
          })
      })
    },
    printTest(_, value) {
      console.log(value);
      const URI = `http://localhost:8000/api/tests/print?test=${value.id}&answersSheet=${value.printOptions.answersSheet}&randomize=${value.printOptions.randomize}&numberOfTests=${value.printOptions.numberOfTests}&reviewPassword=${value.printOptions.reviewPassword}`;
      return new Promise((resolve, reject) => {
        axios.get(URI, {responseType: 'blob'})
          .then(response => {
            console.log(response)
            resolve(response);
            /* var binary = atob(response.data.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
              view[i] = binary.charCodeAt(i);
            } */

            // create the blob object with content-type "application/pdf"               
            /* var blob = new Blob([view], { type: "application/pdf" });
            const url = URL.createObjectURL(blob); */
            const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
          })
          .catch(error => {
            reject(error)
            console.log(error);
          })
      })
    },
    getSignature() {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/api/categories`)
          .then(response => {
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            reject(error)
            console.log(error);
          })
      })
    },
    getQuestions() {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/api/questions`)
          .then(response => {
            resolve(response)
            console.log(response)
          })
          .catch(error => {
            reject(error)
            console.log(error)
          })
      })
    },
    deleteQuestion(context, value) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/api/questions/${value.id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    changeLines(_, value) {
      return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8000/api/questions/changeLines/${value.id}`,{
          lines_answer: value.lines_answer
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
