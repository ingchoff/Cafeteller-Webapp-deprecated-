export const state = () => ({
  username: null,
  token: null,
  role: null,
  chatInfo: [],
  redirectUrl: ''
})

export const mutations = {
  SetUser(state, user) {
    state.username = user.username
    state.token = user.token
    state.role = user.role
  },
  ClearUser(state) {
    state.username = ''
    state.token = ''
    state.role = ''
  },
  SetChat(state, chat) {
    state.chatInfo = chat
  },
  SetUrl(state, url) {
    state.redirectUrl = url
  }
}
