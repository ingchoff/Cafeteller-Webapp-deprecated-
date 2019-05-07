export const state = () => ({
  username: null,
  token: null,
  role: null
})

export const mutations = {
  SetUser(state, user) {
    state.username = user.username
    state.token = user.token
  },
  ClearUser(state) {
    state.username = ''
    state.token = ''
  },
  SetRole(state, role) {
    state.role = role
  }
}
