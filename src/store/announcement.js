/*
*
* 公告数据状态
*
*/

const state = () => {
  return {
    fetching: false,
    data: {
      data: []
    }
  }
}

const mutations = {
  REQUEST_LIST(state) {
    state.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.fetching = false
    state.data = { data: [] }
  },
  GET_LIST_SUCCESS(state, action) {
    state.fetching = false
    state.data = action.result
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
