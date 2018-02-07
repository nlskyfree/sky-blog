import Vue from 'vue';
import App from './App';
import router from './route';
import store from './store'
import axios from 'axios';
import './less/index';

Vue.config.debug = true;
Vue.prototype.http = axios;

const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
