<template>
  <div class="container">
    <div class="row">
      <Review
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :title="post.name"
        :excerpt="post.place"
        :img="post.thumbnailUrl"
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
  data() {
    return {
      posts: [
        {
          name: 'Brave Roasters : Space Oddity',
          place: 'Seen Space Thonglor 13',
          thumbnailUrl:
            'https://static.wixstatic.com/media/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.jpg/v1/fill/w_400,h_408,al_c,q_80,usm_0.66_1.00_0.01/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.webp',
          id: 'a-new-beginning'
        },
        {
          name: 'Simple Coffee, Simple Life',
          place: 'Rama 9 Soi 45',
          thumbnailUrl:
            'https://static.wixstatic.com/media/03d7e2_4b9cbfda883544cf9ca152d0f6416c08~mv2.jpg/v1/fill/w_400,h_408,al_c,q_80,usm_0.66_1.00_0.01/03d7e2_4b9cbfda883544cf9ca152d0f6416c08~mv2.webp',
          id: 'a-new-beginning'
        },
        {
          name: 'Brave Roasters : Space Oddity',
          place: 'Seen Space Thonglor 13',
          thumbnailUrl:
            'https://static.wixstatic.com/media/03d7e2_e5e88c7672a24acaa71fe4e25e7fba2b~mv2_d_1333_2000_s_2.jpg/v1/fill/w_400,h_408,al_c,q_80,usm_0.66_1.00_0.01/03d7e2_e5e88c7672a24acaa71fe4e25e7fba2b~mv2_d_1333_2000_s_2.webp',
          id: 'a-new-beginning'
        },
        {
          name: 'Sundays',
          place: 'Thonglor',
          thumbnailUrl: 'https://www.w3schools.com/w3css/img_lights.jpg',
          id: 'a-new-beginning'
        }
      ]
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

@media (max-width: 992px) {
  .container {
    max-width: 720px;
  }
  .row {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .container {
    max-width: 540px;
  }
  .row {
    justify-content: center;
  }
}
</style>
