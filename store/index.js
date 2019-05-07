export const state = () => ({
  username: '',
  token: ''
})

export const mutations = {
  SetUser(state, user) {
    state.username = user.username
    state.token = user.token
  }
}
