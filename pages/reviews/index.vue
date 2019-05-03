<template>
  <div class="container">
    <div class="row">
      <Review
        v-for="review in cafereviews"
        :id="review.id"
        :key="review.id"
        :title="review.title"
        :excerpt="review.content"
      />
    </div>
    <br /><br /><br /><br /><br />
  </div>
</template>

<script>
import Review from '@/components/CafeReview/Review'
export default {
  components: {
    Review
  },
  async asyncData({ params, $axios }) {
    const cafereviews = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/reviews/`
    )
    return {
      cafereviews: cafereviews.data,
      project: 'project'
    }
  }
}
</script>

<style scoped>
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
    padding-left: 50px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    max-width: 720px;
  }
  .row {
    justify-content: center;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .container {
    max-width: 540px;
  }
  .row {
    justify-content: center;
  }
}
</style>
