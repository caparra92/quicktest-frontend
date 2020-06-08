import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import Logout from '../views/Logout.vue'
import Tests from '../views/Tests.vue'
import Questions from '../views/Questions.vue'
import QuestionCard from '../components/QuestionCard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [ 
      { path: 'tests', component: Tests }, 
      { path: 'questions', component: Questions }
    ],
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/questions/:question',
    name: 'questionFind',
    component: QuestionCard
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
})

export default router
