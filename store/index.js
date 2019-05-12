export const state = () => ({
  uid: null,
  username: null,
  token: null,
  role: null,
  chatInfo: [],
  redirectUrl: '/',
  subscriber: 0
})

export const mutations = {
  SetUser(state, user) {
    state.uid = user.id
    state.username = user.username
    state.token = user.token
    state.role = user.role
  },
  ClearUser(state) {
    state.username = ''
    state.token = ''
    state.role = ''
    state.uid = ''
  },
  SetChat(state, chat) {
    state.chatInfo = chat
  },
  SetUrl(state, url) {
    state.redirectUrl = url
  },
  AddSub(state, sub) {
    state.subscriber = sub
    state.subscriber++
  },
  GetSub(state, sub) {
    state.subscriber = sub
  }
}

export const actions = {
  nuxtServerInit({ commit }, user) {
    commit('SetUser', user)
  }
}
