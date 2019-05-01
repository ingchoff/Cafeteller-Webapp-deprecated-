<template>
  <!-- <div class="container"> -->
  <div class="row justify-content-center">
    <Review
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import Review from '@/components/CafeReview/Review'
export default {
  components: {
    Review
  },
  data() {
    return {
      posts: [
        {
          title: 'A new Beginning',
          previewText: 'This preview text',
          thumbnailUrl:
            'https://www.snowgoose.com.au/site/assets/media/images/product-images-2016/Mixed-FruitAerial.png',
          id: 'a-new-beginning'
        },
        {
          title: 'A Second Beginning',
          previewText: 'This preview text',
          thumbnailUrl:
            'https://www.snowgoose.com.au/site/assets/media/images/product-images-2016/Mixed-FruitAerial.png',
          id: 'a-second-beginning'
        },
        {
          title: 'A Second Beginning',
          previewText: 'This preview text',
          thumbnailUrl:
            'https://www.snowgoose.com.au/site/assets/media/images/product-images-2016/Mixed-FruitAerial.png',
          id: 'a-second-beginning'
        },
        {
          title: 'A Second Beginning',
          previewText: 'This preview text',
          thumbnailUrl:
            'https://www.snowgoose.com.au/site/assets/media/images/product-images-2016/Mixed-FruitAerial.png',
          id: 'a-second-beginning'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
