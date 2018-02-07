import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [{
      path: '/',
      name: 'home',
    },{
      path: '/article',
      name: 'article',
    },{
      path: '/project',
      name: 'project',
    },{
      path: '/music',
      name: 'music',
    },{
      path: '/about',
      name: 'about',
    },{
      path: '/service',
      name: 'service',
    },{
      path: '/guestbook',
      name: 'guestbook',
    }
  ]
});