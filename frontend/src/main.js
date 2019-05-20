import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/default.css'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/vueselect'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
