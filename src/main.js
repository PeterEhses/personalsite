import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'

import ColorThief from 'colorthief/dist/color-thief.mjs'
// const colorThief = new ColorThief();
Vue.prototype.$colorThief = new ColorThief();
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
