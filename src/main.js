// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex'
import App from './App'
import './unit/const'
import './control'
import { subscribeRecord } from './unit'

 // 将更新的状态记录到localStorage
subscribeRecord(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})

