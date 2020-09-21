
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/projects',
    // meta:{
    //   collection: "projects",
    // },
    // name: 'Projekte',
    // component: () => import(/* webpackChunkName: "projects" */ '../views/projects.vue')
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
    path: '/datenschutz',
    name: 'Datenschutz',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "datenschutz" */ '../views/datenschutz.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "impressum" */ '../views/impressum.vue')
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
    name: 'Projekt',
    component: () => import('../views/projects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
