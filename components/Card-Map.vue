<template>
  <div v-text="temp"></div>
</template>

<script>
export default {
  props: {
    cafe: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      temp: this.cafe
    }
  }
}
</script>
