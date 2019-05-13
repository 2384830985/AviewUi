import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AViewUi from './../packages/index'
// 注册组件库
Vue.use(AViewUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
