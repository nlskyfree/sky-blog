import Vue from 'vue';
import App from './App';
import router from './route';
import store from './store'
import axios from 'axios';
import './less/index';
import EmptyBox from 'components/common/empty-box'
import Loading from 'components/common/loading'
// 全局组件注册
Vue.component("empty-box", EmptyBox);
Vue.component("loading-box", Loading);

// 全局baseURL
// axios.defaults.baseURL = 'http://localhost:3002';
Vue.config.debug = true;
Vue.prototype.http = axios;

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {App },
  template: '<App/>'
});
