/*
*
* 文章数据状态
*
*/

const state = () => {
  return {
    hot: {
      fetching: false,
      data: []
    },
    list: {
      fetching: false,
      pagination: {
        current_page: 0
      },
      data: []
    },
    detail: {
      fetching: false,
      data: {}
    }
  }
}

const mutations = {

  // List
  CLEAR_LIST(state) {
    state.list.data = {
      data: [],
      pagination: {
        current_page: 0
      }
    }
  },
  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS(state, action) {
    state.list.data = action
  },
  ADD_LIST_SUCCESS(state, action) {
    state.list.data.push.apply(state.list.data, action.data)
    state.list.data.pagination = action.pagination
  },

  // Hot
  REQUEST_HOT_LIST(state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE(state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS(state, action){
    state.hot.data = action
  },

  // Detail
  CLEAR_DETAIL(state) {
    state.detail.data = {}
  },
  REQUEST_DETAIL(state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE(state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS(state, action) {
    state.detail.fetching = false
    state.detail.data = action.result
  },

  // 喜欢某篇文章
  LIKE_ARTICLE(state, action) {
    let article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.likes ++
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
