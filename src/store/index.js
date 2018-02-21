import Vue from 'vue'
import Vuex from 'vuex'
import announcement from './announcement'
import article from './article'
import category from './category'
import comment from './comment'
import option from './option'
import project from './project'
import sitemap from './sitemap'
import tag from './tag'
import axios from 'axios'
import EventBus from 'utils/event-bus'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    announcement,
    article,
    category,
    comment,
    option,
    project,
    sitemap,
    tag,
  },
  // 注册全局actions
  actions: {
    // 获取博主资料
    loadAdminInfo({ commit }) {
      commit('option/REQUEST_ADMIN_INFO')
      return axios.get('/auth')
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) commit('option/REQUEST_ADMIN_INFO_SUCCESS', response.data)
          if (!success) commit('option/REQUEST_ADMIN_INFO_FAILURE')
        }, err => {
          commit('option/REQUEST_ADMIN_INFO_FAILURE', err)
        })
    },

    // 获取全局配置
    loadGlobalOption({ commit }) {
      commit('option/REQUEST_GLOBAL_OPTIONS')
      return axios.get('/option')
        .then(response => {
          const success = !!response.status && response.data
          if (success) commit('option/REQUEST_GLOBAL_OPTIONS_SUCCESS', response.data)
          if (!success) commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE')
        }, err => {
          commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
        })
    },

    // 获取标签列表
    loadTagList({ commit }, params = { per_page: 160 }) {
      commit('tag/REQUEST_LIST')
      return axios.get('/tag', { params })
        .then(response => {
          const success = !!response.status && response.data
          if (success) commit('tag/GET_LIST_SUCCESS', response.data)
          if (!success) commit('tag/GET_LIST_FAILURE')
        })
        .catch(err => {
          commit('tag/GET_LIST_FAILURE', err)
        })
    },

    // 获取分类列表
    loadCategories({ commit }, params = { per_page: 100 }) {
      commit('category/REQUEST_LIST')
      return axios.get('/category', { params })
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) commit('category/GET_LIST_SUCCESS', response.data)
          if (!success) commit('category/GET_LIST_FAILURE')
        })
        .catch(err => {
          commit('category/GET_LIST_FAILURE', err)
        })
    },

    // 获取最热文章列表
    loadHotArticles({ commit }) {
      commit('article/REQUEST_HOT_LIST')
      return axios.get('/article', { params: { hot: 1 } })
        .then(response => {
          const success = !!response.status && response.data
          if (success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
          if (!success) commit('article/GET_HOT_LIST_FAILURE')
        }, err => {
          commit('article/GET_HOT_LIST_FAILURE', err)
        })
    },

    // 根据post-id获取评论列表
    loadCommentsByPostId({ commit }, params) {
      params.sort = params.sort || -1
      params.page = params.page || 1
      params.per_page = params.per_page || 88
      if (Object.is(params.page, 1)) {
        commit('comment/CLEAR_LIST')
      }
      commit('comment/REQUEST_LIST')
      return axios.get('/comment', { params })
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) {
            if (Object.is(params.sort, -1)) response.data.result.data.reverse()
            commit('comment/GET_LIST_SUCCESS', response.data)
          }
          if (!success) commit('comment/GET_LIST_FAILURE')
        }, err => {
          commit('comment/GET_LIST_FAILURE', err)
        })
    },

    // 发布评论
    postComment({ commit }, comment) {
      commit('comment/POST_ITEM')
      return axios.post('/comment', comment)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) {
            commit('comment/POST_ITEM_SUCCESS', response.data)
            return Promise.resolve(response.data)
          } else {
            commit('comment/POST_ITEM_FAILURE')
            return Promise.reject(response.data)
          }
        }, err => {
          commit('comment/POST_ITEM_FAILURE', err)
          return Promise.reject(err)
        })
    },

    // 喜欢某个页面或主站 || 为某条回复点赞
    likeArticleOrPageOrComment({ commit }, like) {
      return axios.post('/like', like)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) {
            let mutation
            switch (like.type) {
              case 1:
                mutation = 'comment/LIKE_ITEM'
                break
              case 2:
                mutation = Object.is(like.id, 0) ? 'option/LIKE_SITE' : 'article/LIKE_ARTICLE'
                break
              default:
                break
            }
            commit(mutation, like)
            return Promise.resolve(response.data)
          } else {
            return Promise.reject(response.data)
          }
        }, err => {
          return Promise.reject(err)
        })
    },

    // 获取公告列表
    loadAnnouncements({ commit }, params = {}) {
      commit('announcement/REQUEST_LIST')
      return axios.get('/announcement', { params })
        .then(response => {
          const success = !!response.status && response.data
          if (success) commit('announcement/GET_LIST_SUCCESS', response.data)
          if (!success) commit('announcement/GET_LIST_FAILURE')
        }, err => {
          commit('announcement/GET_LIST_FAILURE', err)
        })
    },

    // 获取地图文章列表
    loadSitemapArticles({ commit }, params = { page: 1 }) {
      commit('sitemap/REQUEST_ARTICLES')
      return axios.get('/article', { params })
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          const commitName = `sitemap/GET_ARTICLES_SUCCESS`
          if (success) commit(commitName, response.data)
          if (!success) commit('sitemap/GET_ARTICLES_FAILURE')
        })
        .catch(err => {
          commit('sitemap/GET_ARTICLES_FAILURE', err)
        })
    },

    // 获取文章列表
    loadArticles({ commit }, params = { page: 1 }) {
      commit('article/REQUEST_LIST')
      return axios.get('/article', { params })
        .then(response => {
          const success = !!response.status && response.data
          const isFirstPage = params.page && params.page > 1
          const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
          if (success) commit(commitName, response.data)
          if (!success) commit('article/GET_LIST_FAILURE')
        })
        .catch(err => {
          commit('article/GET_LIST_FAILURE', err)
        })
    },

    // 获取文章详情
    loadArticleDetail({ commit }, params = {}) {
      commit('article/REQUEST_DETAIL')
      return axios.get(`/article/${params.article_id}`)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) commit('article/GET_DETAIL_SUCCESS', response.data)
          if (!success) commit('article/GET_DETAIL_FAILURE')
          return Promise.resolve(response.data)
        }, err => {
          commit('article/GET_DETAIL_FAILURE', err)
          return Promise.reject(err)
        })
    },

    // 获取开源项目列表
    loadGithubRepositories({ commit, state }) {
      // 如果数据已存在，则直接返回Promise成功，并返回数据
      if (state.project.repositories.data.length) {
        return Promise.resolve(state.project.repositories.data)
      }
      // 不存在则请求新数据
      commit('project/REQUEST_GUTHUB_REPOSITORIES')
      return axios.get(`/github`)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) commit('project/REQUEST_GUTHUB_REPOSITORIES_SUCCESS', response.data)
          if (!success) commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE')
        }, err => {
          commit('project/REQUEST_GUTHUB_REPOSITORIES_FAILURE', err)
        })
    },

    // 获取歌曲列表
    loadMuiscPlayerList({ commit }) {
      EventBus.REQUEST_LIST()
      return axios.get('/music/list/638949385')
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) {
            EventBus.GET_LIST_SUCCESS(response.data)
            EventBus.INIT_PLAYER()
          }
          if (!success) EventBus.GET_LIST_FAILURE()
        }, err => {
          EventBus.GET_LIST_FAILURE(err)
        })
    },

    // 获取歌曲详情
    loadMuiscSongDetail({ commit }, params = {}) {
      EventBus.REQUEST_SONG()
      return axios.get(`/music/song/${params.song_id}`)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) EventBus.GET_SONG_SUCCESS(response.data)
          if (!success) EventBus.GET_SONG_FAILURE()
        }, err => {
          EventBus.GET_SONG_FAILURE(err)
        })
    },

    // 获取歌曲歌词
    loadMuiscSongLrc({ commit }, params = {}) {
      EventBus.REQUEST_LRC()
      return axios.get(`/music/lrc/${params.song_id}`)
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.code, 1)
          if (success) EventBus.GET_LRC_SUCCESS(response.data)
          if (!success) EventBus.GET_LRC_FAILURE()
        }, err => {
          EventBus.GET_LRC_FAILURE(err)
        })
    }
  }
})