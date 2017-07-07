// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/neat-min.css'
import store from './vuex/store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(mint)
Vue.use(VueResource)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
