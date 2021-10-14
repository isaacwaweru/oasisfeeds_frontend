import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Landing from '../views/Landing.vue'
import Dashboard from '../views/Dashboard.vue'
import SendSMS from '../views/Sendsms.vue'
import SentSMS from '../views/SentSms.vue'
import Outbox from '../views/Outbox.vue'
import Drafts from '../views/Drafts.vue'
import TopUp from '../views/TopUp.vue'
import Contacts from '../views/Contacts.vue'
import Help from '../views/Help.vue'
import Main from '../views/Main.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      requiresAuth: true
    }
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
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/send',
        name: 'SendSMS',
        component: SendSMS
      },
      {
        path: '/sent',
        name: 'SentSMS',
        component: SentSMS
      },
      {
        path: '/outbox',
        name: 'Outbox',
        component: Outbox
      },
      {
        path: '/drafts',
        name: 'Drafts',
        component: Drafts
      },
      {
        path: '/topup',
        name: 'TopUp',
        component: TopUp
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
      },
      {
        path: '/help',
        name: 'Help',
        component: Help
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
