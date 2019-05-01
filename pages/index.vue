<template>
  <!-- <div class="container"> -->
  <GoogleMap style="width:90%; height: 70vh;" />
  <!-- </div> -->
</template>

<script>
import GoogleMap from '@/components/Map'

export default {
  components: {
    GoogleMap
  },
  data() {
    return {}
  }
}
</script>

<style>
.container {
  margin: 15rem auto;
  display: flex;
  justify-content: center;
}
</style>
