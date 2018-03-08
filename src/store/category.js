/*
*
* 分类数据状态
*
*/

const state = () => {
  return {
    fetching: false,
    data: []
  }
}

const mutations = {
  REQUEST_LIST(state) {
    state.fetching = true
  },
  GET_LIST_SUCCESS(state, action) {
    state.data = action
  },
  GET_LIST_FAILURE(state) {
    state.fetching = false
    state.data = []
  }
}


export default {
  namespaced: true,
  state,
  mutations
}
