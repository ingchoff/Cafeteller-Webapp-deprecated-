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
  data() {
    return {
      cafeinfo: []
    }
  },
  async mounted() {
    this.$store.commit('SetUser', {
      id: localStorage.getItem('uid'),
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
    try {
      const chatToken = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/get/token/`,
        {
          headers: {
            Authorization: 'token' + localStorage.getItem('token')
          }
        }
      )
      this.$store.commit('SetChat', chatToken.data)
    } catch (err) {
      console.log('chattoken' + err.request.response)
    }
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
