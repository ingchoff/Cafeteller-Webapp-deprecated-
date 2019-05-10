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
  mounted() {
    this.$store.commit('SetUser', {
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
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
