
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    meta:{
      collection: "projects",
    },
    name: 'Projekte',
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects.vue')
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
    path: '/projects',
    meta:{
      collection: "projects",
    },

    name: 'Projekte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects.vue')
  },
  {
    path: '/projects/:id',
    meta:{
      collection: "projects",
    },
    name: 'Projekte',
    component: () => import('../views/projects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
