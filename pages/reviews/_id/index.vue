<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ThumbnailsImage />
        <div class="card" style="width: 60%;">
          <div class="card-body">
            <h5 class="card-title">
              <u>{{ cafestore.name }}</u>
            </h5>
            <p class="card-subtitle mb-2 text-muted">
              Location: {{ cafestore.address }}
            </p>
            <p class="card-text text-muted">
              Description: {{ cafestore.description }}
            </p>
            <ul class="social">
              Visit Us:
              <li>
                <a href="https://www.facebook.com/cafeteller"
                  ><img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp"
                /></a>
              </li>
              <li>
                <a href="https://twitter.com/cafeteller"
                  ><img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/c7d035ba85f6486680c2facedecdcf4d.webp"
                /></a>
              </li>
              <li>
                <a href="https://instagram.com/cafeteller"
                  ><img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp"
                /></a>
              </li>
            </ul>
            <div class="store-map">
              <GoogleMap
                style="width: 100%; height: 280px; margin: 0;"
                :storePos="{
                  lat: cafestore.latitude,
                  lng: cafestore.longitude
                }"
                :storeName="cafestore.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <h1>{{ cafereviews.title }}</h1>
        <!-- ที่อยู่ร้าน -->
        <p>{{ cafestore.address }}</p>
        <hr />
        <p>{{ cafereviews.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/Map'
import ThumbnailsImage from '@/components/CafeReview/ThumbnailsCarousel'
export default {
  components: {
    ThumbnailsImage,
    GoogleMap
  },
  async asyncData({ params, $axios }) {
    const cafereviews = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/reviews/${params.id}`
    )
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/${cafereviews.data.store}`
    )
    return {
      cafereviews: cafereviews.data,
      cafestore: cafestore.data,
      project: 'project'
    }
  }
}
</script>

<style scoped>
.social {
  padding: 0;
}

.social li {
  display: inline-block;
  margin-right: 10px;
}

.img-social {
  opacity: 1;
  transition: 0.3s;
}

.img-social:hover {
  opacity: 0.6;
}

.card-body {
  padding: 0.75rem;
}

.store-map {
  overflow: hidden;
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
