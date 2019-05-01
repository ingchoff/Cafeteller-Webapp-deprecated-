<template>
  <div class="container">
    <GoogleMap
      class="myMap"
      style="width:100%; height: 700px; border-radius: 10px;"
    />
  </div>
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

<style scoped>
.container {
  margin: 0 auto 5rem auto;
  display: flex;
  justify-content: center;
}

.myMap {
  transition: box-shadow 0.3s;
}

.myMap:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
</style>
