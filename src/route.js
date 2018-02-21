import Vue from 'vue';
import Router from 'vue-router';
import main from 'components/main'
import project from 'components/project'
import music from 'components/music'
import about from 'components/about'
import guestbook from 'components/guestbook'

Vue.use(Router);

// 哪个菜单需要几列显示
const oneColumnPages = ['music']
const twoColumnPages = ['project', 'about']

const router = new Router({
  // 对应路由增加class高亮
  linkActiveClass:'link-active',

  routes: [{
      path: '/',
      name: 'home',
      component: main
    },{
      path: '/article',
      name: 'article',
    },{
      path: '/project',
      name: 'project',
      component: project
    },{
      path: '/music',
      name: 'music',
      component: music
    },{
      path: '/about',
      name: 'about',
      component: about
    },{
      path: '/service',
      name: 'service',
    },{
      path: '/guestbook',
      name: 'guestbook',
      component: guestbook
    }
  ]
})

// 路由跳转前逻辑
router.beforeEach((to, from, next) => {
  // twoColumn则不显示右侧热门文章、标签等
  let isOneColumn = oneColumnPages.indexOf(to.name) != -1 ? true : false
  let isTwoColumn = twoColumnPages.indexOf(to.name) != -1 ? true : false
  router.app.$options.store.commit("option/SET_ONE_COLUMN", isOneColumn)
  router.app.$options.store.commit("option/SET_TWO_COLUMN", isTwoColumn)
  next()
})

export default router;