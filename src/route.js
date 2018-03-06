import Vue from 'vue';
import Router from 'vue-router';
import main from 'components/main'
import project from 'components/pages/project'
import sitemap from 'components/pages/sitemap'
import music from 'components/pages/music'
import about from 'components/pages/about'
import guestbook from 'components/pages/guestbook'
import article from 'components/pages/article'

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
      path: '/sitemap',
      name: 'sitemap',
      component: sitemap
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
    },{
      path: '/article/:id',
      name: 'article',
      component: article
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