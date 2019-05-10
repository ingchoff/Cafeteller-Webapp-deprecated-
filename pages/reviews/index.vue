<template>
  <div class="container">
    <div class="button-add">
      <nuxt-link v-if="$store.state.role === 2" to="/reviews/add">
        <button type="button" class="btn btn-info">
          <i class="material-icons">
            note_add
          </i>
          Add Review
        </button>
      </nuxt-link>
    </div>
    <div class="row">
      <Review
        v-for="review in cafereviews"
        :id="review.id"
        :key="review.id"
        :title="review.title"
        :excerpt="review.content"
      />
    </div>
    <br /><br />
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
.btn {
  padding: 5px;
}
.button-add {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}
.add-btn {
  width: 10rem;
  background: #fdfd96;
  /* padding: 10px 40px 10px 40px; */
  border-radius: 20px;
  color: #fff;
  /* margin-left: 5px; */
}
.add-btn {
  padding: 5px;
  text-decoration: none;
  color: black;
}
.add-btn a:link,
.add-btn a:hover {
  color: black;
  text-decoration: none;
}
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
