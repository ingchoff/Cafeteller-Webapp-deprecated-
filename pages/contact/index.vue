<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('SetUrl', this.$route.path)
  }
}
</script>
