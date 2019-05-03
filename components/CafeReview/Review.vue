<template>
  <div class="card">
    <div style="overflow:hidden;">
      <nuxt-link :to="{ name: 'reviews-id', params: { id: id } }">
        <div class="img" :style="{ backgroundImage: 'url(' + img + ')' }" />
        <!-- <div class="img" /> -->
      </nuxt-link>
    </div>
    <div class="card-body">
      <p class="card-text font-weight-bold">{{ title }}</p>
      <p class="card-text ">{{ excerpt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      img:
        'https://static.wixstatic.com/media/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.jpg/v1/fill/w_400,h_408,al_c,q_80,usm_0.66_1.00_0.01/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.webp'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.card {
  margin: 0 20px 10px 20px;
  border: none;
  width: 320px;
  height: 376px;
  background-color: #333;
  /* overflow: hidden; */
}

.img {
  width: 320px;
  height: 376px;
  transition: all 0.3s ease-in-out;
}

.img:hover {
  transform: scale(1.1);
  filter: alpha(opacity=0.5);
  opacity: 0.5;
}

.card-body {
  padding: 0;
  background: #fffaf0;
}

.card-text {
  margin: 0;
  text-align: center;
}
</style>
