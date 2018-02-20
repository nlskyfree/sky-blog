/*
*
* 网站地图需要使用的文章数据状态
*
*/

import Vue from 'vue'

const state = () => {
  return {
    articles: {
      fetching: false,
      data: { data: [] }
    }
  }
}

const mutations = {
  REQUEST_ARTICLES(state) {
    state.articles.fetching = true
  },
  GET_ARTICLES_FAILURE(state) {
    state.articles.fetching = false
  },
  GET_ARTICLES_SUCCESS(state, action) {
    state.articles.fetching = false
    state.articles.data = action.result
  },
  TOGGLE_ARTICLE_OPEN(state, index) {
    const article = state.articles.data.data[index]
    if (article) {
      Vue.set(article, 'open', !article.open)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}