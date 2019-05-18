<template>
  <div class="row">
    <div class="col-4">
      <div class="contact-list">
        <div class="header">
          <p>กล่องข้อความ</p>
        </div>
        <div class="content">
          <a v-for="room in $store.state.chatInfo" :key="room.id">
            <div class="content-list-item">
              <div class="content-list">
                <span v-if="room.users[0] !== parseInt($store.state.uid)">{{
                  room.users[0]
                }}</span>
                <span v-if="room.users[1] !== parseInt($store.state.uid)">{{
                  room.users[1]
                }}</span>
                <span>ข้อความล่าสุด</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="col-8">
        <ul class="list-group">
          <li
            v-for="i in $store.state.chatMessage"
            :key="i.id"
            class="list-group-item"
          >
            <span :class="{ owner: isOwner(i.sender) }">{{ i.message }}</span>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-10">
                <input v-model="text" type="text" class="form-control" />
              </div>
              <div class="col-1">
                <button type="button" class="btn btn-success" @click="send">
                  Send
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div class="container d-flex justify-content-center">
    <div class="col-8">
      <ul class="list-group">
        <li
          v-for="i in $store.state.chatMessage"
          :key="i.id"
          class="list-group-item"
        >
          <span :class="{ owner: isOwner(i.sender) }">{{ i.message }}</span>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-10">
              <input v-model="text" type="text" class="form-control" />
            </div>
            <div class="col-1">
              <button type="button" class="btn btn-success" @click="send">
                Send
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      text: '',
      currentMessage: [],
      sender: null,
      reciever: null
    }
  },
  async mounted() {
    try {
      const messages = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
        {
          headers: {
            Authorization: 'token' + this.$store.state.token
          }
        }
      )
      for (let i = 0; i < messages.data.length; i++) {
        if (
          (messages.data[i].reciever === 4 && messages.data[i].sender === 3) ||
          (messages.data[i].reciever === 3 && messages.data[i].sender === 4)
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
    const channel = pusher.subscribe(this.$store.state.chatInfo[0].token) // eslint-disable-line no-undef
    channel.bind('message-sending', data => {
      this.$store.commit('AddMessage', data)
      // if (this.$store.state.username.username !== data.name) {
      //   this.$store.commit('addMessage', data)
      // }
    })
  },
  methods: {
    // clickToChat() {

    // },
    async send() {
      console.log(this.$store.state.token)
      console.log(this.$store.state.uid)
      try {
        await this.$axios.post(
          `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
          {
            message: this.text,
            reciever: 3
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
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  background-color: white;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header p {
  margin: 0;
}
.content {
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
}
.content-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px 0;
  height: 100px;
}
.content-list {
  display: flex;
  flex-direction: column;
}
.owner {
  float: right;
}
</style>
