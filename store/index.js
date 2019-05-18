export const state = () => ({
  uid: null,
  username: null,
  token: null,
  role: null,
  chatInfo: null,
  chatMessage: [],
  redirectUrl: '/',
  subscriber: 0,
  subChannel: null
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
    state.chatMessage = null
    state.chatInfo = null
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
  },
  DelSub(state, sub) {
    state.subscriber = sub
    state.subscriber = state.subscriber - 1
  },
  SetMessage(state, message) {
    state.chatMessage = message
  },
  AddMessage(state, message) {
    state.chatMessage.push(message)
  },
  SetSubChannel(state, channel) {
    state.subChannel = channel
  }
}

export const actions = {
  nuxtServerInit({ commit }, user) {
    commit('SetUser', user)
  }
  // async GET_MESSAGE({ commit }, state) {
  //   const { data } = await this.$axios.get(
  //     `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
  //     {
  //       headers: {
  //         Authorization: 'token' + state.token
  //       }
  //     }
  //   )
  //   commit('SetMessage', data)
  // }
}
