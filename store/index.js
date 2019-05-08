export const state = () => ({
  username: null,
  token: null,
  role: null,
  chatInfo: [],
  is_subscribe: false
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
  Subscribe(state, value) {
    state.is_subscribe = value.val
    // try {
    //   await this.$axios.post(
    //     `${this.$axios.defaults.baseURL}api/v1/subscribe/store/${id.store}/`
    //   )
    // } catch (err) {
    //   console.log(err.request.response)
    // }
  }
}
