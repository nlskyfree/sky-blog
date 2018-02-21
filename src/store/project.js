/*
*
* 项目/github数据状态
*
*/

const state = () => {
  return {
    repositories: {
      fetching: false,
      data: []
    }
  }
}

const mutations = {
  REQUEST_GUTHUB_REPOSITORIES(state) {
    state.repositories.fetching = true
  },
  REQUEST_GUTHUB_REPOSITORIES_SUCCESS(state, action) {
    state.repositories.data = action
  },
  REQUEST_GUTHUB_REPOSITORIES_FAILURE(state) {
    state.repositories.fetching = false
    state.repositories.data = {}
  }
}

export default {
  namespaced: true,
  state,
  mutations
}