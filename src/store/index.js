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
      
      if (context.getters.loggedIn){
        
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
    findQuestions(context, value) {
      
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8000/api/questions/${value.question}`)
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
    addQuestion(context, value) {
      return new Promise((resolve, reject) => {
        axios.post(`http://localhost:8000/api/questions/new`, {
          course: value.course,
          description: value.description,
          type: value.type,
          level: value.level,
          user_id: localStorage.user_id,
          answer: value.answer
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
    toTest(context, value) {
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
    }
  },
  modules: {
  }
})
