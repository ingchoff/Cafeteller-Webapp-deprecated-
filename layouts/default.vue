<template>
  <div>
    <Header />
    <main class="container">
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
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.main-content {
  margin-top: 177px;
}
</style>
