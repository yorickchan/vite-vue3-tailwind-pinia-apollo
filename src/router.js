import { createRouter, createWebHistory } from 'vue-router'
import jwt_decode from 'jwt-decode'
// import { useMainStore } from './stores/main'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import('./pages/Home.vue'),
      name: 'home',
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const token = to.query.token
//   if (token) {
//     localStorage.setItem('token', token)
//   }
//   if (localStorage.getItem('token')) {
//     var decoded = jwt_decode(localStorage.getItem('token'))
//     if (Math.floor(Date.now() / 1000) > decoded.exp) {
//       localStorage.clear()
//     }
//   }
//   const store = useMainStore()
//   store.initialize()

//   next()
// })

export default router
