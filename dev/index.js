import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Rabotify from 'rabotify'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(Rabotify);
Vue.use(VueRouter);

Vue.component(Boilerplate.name, Boilerplate);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
