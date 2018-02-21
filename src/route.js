import Vue from 'vue';
import Router from 'vue-router';
import project from 'components/project'
import main from 'components/main'

Vue.use(Router);

// 需要fullColumn显示的菜单
const fullColumnPages = ['project']

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
})

// 路由跳转前逻辑
router.beforeEach((to, from, next) => {
  // fullColumn则不显示右侧热门文章、标签等
  let isFullColumn = fullColumnPages.indexOf(to.name) != -1 ? true : false
  console.log(isFullColumn)
  router.app.$options.store.commit("option/SET_FULL_COLUMN", isFullColumn)
  next()
})

export default router;