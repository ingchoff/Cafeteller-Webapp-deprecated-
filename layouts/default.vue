<template>
  <div>
    <Header />
    <main class="main-content">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
export default {
  components: {
    Header,
    Footer
  },
  // async fetch({ store, params, $axios }) {
  //   try {
  //     const messages = await $axios.get(
  //       `${$axios.defaults.baseURL}api/v1/chat/message/send/`,
  //       {
  //         headers: {
  //           Authorization: 'token' + store.state.token
  //         }
  //       }
  //     )
  //     store.commit('SetMessage', messages)
  //   } catch (err) {
  //     console.log(err.request.response)
  //   }
  // },
  async mounted() {
    this.$store.commit('SetUser', {
      id: localStorage.getItem('uid'),
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
    try {
      const messages = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/chat/message/send/`,
        {
          headers: {
            Authorization: 'token' + this.$store.state.token
          }
        }
      )
      this.$store.commit('SetMessage', messages)
    } catch (err) {
      console.log(err.request.response)
    }
    console.log(this.$store.state.chatMessage)
    // this.$store.commit('SetUrl', this.$route.path)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.main-content {
  font-family: 'Playfair Display', serif;
  font-family: 'Bai Jamjuree', sans-serif;
  margin-top: 220px;
  margin-bottom: 60px;
}
</style>
