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

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/send',
        name: 'SendSMS',
        component: SendSMS,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/sent',
        name: 'SentSMS',
        component: SentSMS,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/outbox',
        name: 'Outbox',
        component: Outbox,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/drafts',
        name: 'Drafts',
        component: Drafts,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/topup',
        name: 'TopUp',
        component: TopUp,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/help',
        name: 'Help',
        component: Help,
        beforeEnter: ifAuthenticated,
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: ifNotAuthenticated
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
