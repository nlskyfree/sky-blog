import Vue from 'vue';
import App from './App';
import router from './route';
import store from './store'
import axios from 'axios';
import './less/index';
import EmptyBox from 'components/common/empty-box'
import Loading from 'components/common/loading'
import filters from './filters'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import 'swiper/dist/css/swiper.css'

// 全局组件注册
Vue.component("empty-box", EmptyBox);
Vue.component("loading-box", Loading);
// 自定义过滤器注册
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 轮播图组件
Vue.use(VueAwesomeSwiper)

// 全局baseURL
axios.defaults.baseURL = 'http://localhost:3002';
Vue.config.debug = true;
Vue.prototype.http = axios;

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {App },
  template: '<App/>'
});
