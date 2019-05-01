<template>
  <div class="card">
    <div style="overflow:hidden;">
      <nuxt-link to="id">
        <div class="img" :style="{ backgroundImage: 'url(' + img + ')' }" />
      </nuxt-link>
    </div>
    <div class="card-body">
      <p class="card-text font-weight-bold">{{ title }}</p>
      <p class="card-text ">{{ excerpt }}</p>
    </div>
  </div>
  <!-- <div class="post-preview">
      <div
        :style="{ backgroudImage: 'url(' + thumbnailImage + ')' }"
        class="post-preview-thumbnail"
      ></div>
      <div class="post-preview-content">
        <h1>{{ title }}</h1>
        <p>{{ excerpt }}</p>
      </div>
    </div> -->
  <!-- </nuxt-link> -->
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
    img: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
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
