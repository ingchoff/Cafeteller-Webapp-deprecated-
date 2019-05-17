<template>
  <!-- <div class="row">
    <div class="col-4">
      <div class="contact-list">
        <div class="header">
          <p>กล่องข้อความ</p>
        </div>
        <div class="content">
          <a>
            <div class="content-list-item">
              <div class="content-list">
                <span>ing</span>
                <span>ing</span>
                <span>ing</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div> -->
  <div class="container d-flex justify-content-center">
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
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  async fetch({ store, params, $axios }) {
    try {
      const messages = await $axios.get(
        `${$axios.defaults.baseURL}api/v1/chat/message/send/`,
        {
          headers: {
            Authorization: 'token' + store.state.token
          }
        }
      )
      store.commit('SetMessage', messages)
    } catch (err) {
      console.log(err.request.response)
    }
  },
  mounted() {
    this.$store.commit('SetUrl', this.$route.path)
  },
  methods: {
    async send() {
      console.log(this.$store.state.token)
      console.log(this.$store.state.uid)
      try {
        const sendMessage = await this.$axios.post(
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
        this.$store.commit('AddMessage', sendMessage)
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
