<template>
  <div class="container">
    <div class="row">
      <div class="col-3" style="padding:0">
        <div class="contact-list">
          <div class="header">
            <p class="font-weight-bold">กล่องข้อความ</p>
          </div>
          <div class="content list-group">
            <nuxt-link
              v-for="(room, index) in $store.state.chatInfo"
              :key="room.id"
              class="links"
              to=""
              @click.native="clickToChat(room.users, index)"
            >
              <div class="content-list-item">
                <div
                  class="col-sm-3 col-xs-3 sideBar-avatar d-flex justify-content-center"
                >
                  <div class="avatar-icon">
                    <img src="~/assets/512.png" />
                  </div>
                </div>
                <div
                  class="col-sm-9 col-xs-9 sideBar-main d-flex justify-content-center"
                >
                  <span>{{ recieverNameInit[index] }}</span>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row heading">{{ recieverName }}</div>
        <div class="row message">
          <div
            v-for="i in $store.state.chatMessage"
            :key="i.id"
            class="row message-body"
          >
            <div class="col-12 message-main">
              <div class="ui-message" :class="{ owner: isOwner(i.sender) }">
                {{ i.message }}
              </div>
            </div>
            <!-- <span :class="{ owner: isOwner(i.sender) }">{{ i.message }}</span> -->
          </div>
          <li class="list-group-item">
            <div class="row send-control">
              <div class="col-10">
                <input v-model="text" type="text" class="form-control" />
              </div>
              <div class="col-1 send">
                <!-- <button type="button" class="btn btn-success" @click="send"> -->
                <i class="material-icons" @click="send">
                  send
                </i>
                <!-- </button> -->
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      text: '',
      currentMessage: [],
      messages: [],
      sender: null,
      reciever: null,
      recieverToName: null,
      recieverName: '',
      recieverNameInit: []
    }
  },
  async mounted() {
    this.$store.commit('SetUser', {
      id: localStorage.getItem('uid'),
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
    if (!this.$store.state.token) {
      this.$router.push({
        name: 'login',
        params: { redirect: this.$store.state.redirectUrl }
      })
      this.$store.commit('ClearUser')
      localStorage.clear()
    } else if (
      this.$store.state.token !== null &&
      this.$store.state.role !== '2' &&
      this.$store.state.role !== '1'
    ) {
      this.$router.push({
        name: 'login'
      })
      this.$store.commit('ClearUser')
      localStorage.clear()
    }
    if (this.$store.state.chatInfo.length > 0) {
      try {
        const messages = await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
          {
            headers: {
              Authorization: 'token' + this.$store.state.token
            }
          }
        )
        this.messages = messages.data
        // กรอง message แสดงตาม ผู้ส่ง-ผู้รับตามห้อง
        for (let i = 0; i < messages.data.length; i++) {
          if (
            (messages.data[i].reciever ===
              this.$store.state.chatInfo[0].users[0] &&
              messages.data[i].sender ===
                this.$store.state.chatInfo[0].users[1]) ||
            (messages.data[i].reciever ===
              this.$store.state.chatInfo[0].users[1] &&
              messages.data[i].sender ===
                this.$store.state.chatInfo[0].users[0])
          ) {
            this.currentMessage.push(messages.data[i])
          }
        }
        this.$store.commit('SetMessage', this.currentMessage)
      } catch (err) {
        console.log('setmessage' + err.request.response)
      }
      Pusher.logToConsole = true // eslint-disable-line no-undef
      let pusher = new Pusher('90b6e5d7cc2ac7bc480b', { // eslint-disable-line
        cluster: 'mt1',
        forceTLS: true
      })
      if (
        this.$store.state.subChannel.includes(
          this.$store.state.chatInfo[0].token
        ) === false
      ) {
        const channel = pusher.subscribe(this.$store.state.chatInfo[0].token)
        this.$store.commit('SetSubChannel', this.$store.state.chatInfo[0].token)
        channel.bind('message-sending', data => {
          this.$store.commit('AddMessage', data)
          // if (this.$store.state.username.username !== data.name) {
          //   this.$store.commit('addMessage', data)
          // }
        })
      }
      if (
        this.$store.state.chatInfo[0].users[0] !==
        parseInt(this.$store.state.uid)
      ) {
        this.reciever = this.$store.state.chatInfo[0].users[0]
      } else if (
        this.$store.state.chatInfo[0].users[1] !==
        parseInt(this.$store.state.uid)
      ) {
        this.reciever = this.$store.state.chatInfo[0].users[1]
      }
      console.log(this.reciever)
      const recieverName = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/user/${this.reciever}/`
      )
      this.recieverName = recieverName.data.username
      for (let i = 0; i < this.$store.state.chatInfo.length; i++) {
        if (
          this.$store.state.chatInfo[i].users[0] !==
          parseInt(this.$store.state.uid)
        ) {
          this.recieverToName = this.$store.state.chatInfo[i].users[0]
        } else if (
          this.$store.state.chatInfo[i].users[1] !==
          parseInt(this.$store.state.uid)
        ) {
          this.recieverToName = this.$store.state.chatInfo[i].users[1]
        }
        const recieverName = await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/v1/user/${this.recieverToName}/`
        )
        this.recieverNameInit.push(recieverName.data.username)
      }
    }
  },
  methods: {
    async clickToChat(users, index) {
      console.log(index)
      Pusher.logToConsole = true // eslint-disable-line no-undef
    let pusher = new Pusher('90b6e5d7cc2ac7bc480b', { // eslint-disable-line
        cluster: 'mt1',
        forceTLS: true
      })
      if (
        this.$store.state.subChannel.includes(
          this.$store.state.chatInfo[index].token
        ) === false
      ) {
        const channel = pusher.subscribe(
          this.$store.state.chatInfo[index].token
        )
        this.$store.commit(
          'SetSubChannel',
          this.$store.state.chatInfo[index].token
        )
        channel.bind('message-sending', data => {
          this.$store.commit('AddMessage', data)
          // if (this.$store.state.username.username !== data.name) {
          //   this.$store.commit('addMessage', data)
          // }
        })
      }
      if (users[0] !== parseInt(this.$store.state.uid)) {
        this.reciever = users[0]
      } else if (users[1] !== parseInt(this.$store.state.uid)) {
        this.reciever = users[1]
      }
      console.log(this.reciever)
      const recieverName = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/user/${this.reciever}/`
      )
      console.log(recieverName.data)
      this.recieverName = recieverName.data.username
      const messages = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
        {
          headers: {
            Authorization: 'token' + this.$store.state.token
          }
        }
      )
      this.messages = messages.data
      this.currentMessage = []
      for (let i = 0; i < this.messages.length; i++) {
        if (
          (this.messages[i].reciever === users[0] &&
            this.messages[i].sender === users[1]) ||
          (this.messages[i].reciever === users[1] &&
            this.messages[i].sender === users[0])
        ) {
          this.currentMessage.push(this.messages[i])
        }
      }
      this.$store.commit('SetMessage', this.currentMessage)
    },
    async send() {
      console.log(this.$store.state.token)
      console.log(this.$store.state.uid)
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
          {
            message: this.text,
            reciever: this.reciever
          },
          {
            headers: {
              Authorization: 'token' + this.$store.state.token
            }
          }
        )
        // this.$store.commit('AddMessage', sendMessage.data)
        this.text = ''
      } catch (err) {
        console.log(err.request.response)
      }
    },
    isOwner(uid) {
      if (uid === parseInt(this.$store.state.uid)) {
        return true
      }
    }
  }
}
</script>

<style scoped>
.contact-list {
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 5px;
  /* height: calc(100vh - 64px); */
  background-color: white;
}
.header {
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 5px;
  border-bottom: 1px solid #eee;
  background: #f4a460;
}
.header p {
  margin: 0;
}
.content {
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
}
.links {
  text-decoration: none;
  color: black;
}
.links:hover,
.links:active {
  color: #06c4d1;
  background-color: bisque;
}
.content-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
  padding: 8px 0 8px 0;
  height: 100px;
}
.content-list-item:hover {
  background-color: antiquewhite;
}
.content-list {
  display: flex;
  justify-content: space-around;
}
.owner {
  float: right;
  width: auto !important;
  background: #dcf8c6 !important;
  border-radius: 10px 10px 0 10px !important;
  padding: 4px 10px 7px !important;
  font-size: 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
}
.avatar-icon {
  height: auto;
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.avatar-icon img {
  width: 49px;
  height: 49px;
}
.heading {
  padding: 15px;
  margin: 0 !important;
  height: 60px;
  width: 100%;
  background-color: #eee;
  font-weight: bold;
}
.message {
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 0 !important;
  margin: 0 !important;
  background-size: cover;
  overflow-y: auto;
  border: 1px solid #f7f7f7;
}
.message-body {
  margin: 0 !important;
  padding: 0 5px 0 5px !important;
  width: auto;
  height: auto;
}
.ui-message {
  width: auto !important;
  padding: 4px 10px 7px !important;
  border-radius: 10px 10px 10px 10px;
  background: #fcfbf7;
  font-size: 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  display: inline-block;
}
.message-main {
  margin: 5px 0 5px 0;
}
.send {
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
}
.send:hover {
  transform: scale(1.25);
}
.send-control {
  justify-content: center;
}
</style>
