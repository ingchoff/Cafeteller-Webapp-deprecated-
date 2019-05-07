<template>
  <div class="container">
    <div class="row">
      <div class="content">
        <h1>{{ cafereviews.title }}</h1>
        <i class="material-icons" style="font-size: 26px;color:red;">
          place
        </i>
        <span class="font-italic text-muted">{{ cafestore.address }}</span>
        <hr />
        <p>{{ cafereviews.content }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card" style="width: 65%;">
          <div class="card-body">
            <h5 class="card-title">
              <u>{{ cafestore.name }}</u>
            </h5>
            <p class="card-subtitle mb-2 text-muted">
              Location: {{ cafestore.address }}
            </p>
            <ul class="social">
              Visit Us:
              <li v-for="url in storeUrl" :key="url.id">
                <a :href="'https://' + url.url">
                  <div v-html="imgUrl(url)"></div> <!-- eslint-disable-line -->
                </a>
              </li>
              <nuxt-link
                :to="{ name: 'store-id', params: { id: cafestore.id } }"
                class="register"
              >
                <a>Our Store Page</a>
              </nuxt-link>
            </ul>
            <div class="store-map">
              <GoogleMap
                style="width: 100%; height: 320px; margin-top: 30px;"
                :pos="{
                  lat: cafestore.latitude,
                  lng: cafestore.longitude
                }"
                :name="cafestore.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <ThumbnailsImage />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/Map-Store'
import ThumbnailsImage from '@/components/CafeReview/ThumbnailsCarousel'
export default {
  components: {
    ThumbnailsImage,
    GoogleMap
  },
  computed: {
    storeUrl: function() {
      const arrUrl = []
      if (this.cafestore.contracts.length > 0) {
        for (let i = 0; i < this.cafestore.contracts.length; i++) {
          if (this.cafestore.contracts[i].type === 'fb') {
            arrUrl.push(this.cafestore.contracts[i])
          } else if (this.cafestore.contracts[i].type === 'tw') {
            arrUrl.push(this.cafestore.contracts[i])
          } else if (this.cafestore.contracts[i].type === 'ig') {
            arrUrl.push(this.cafestore.contracts[i])
          } else {
            arrUrl.push('#')
          }
        }
      }
      return arrUrl
    }
    // url: function() {
    //   if (this.cafestore.contracts.length !== 0) {
    //     return 'https://' + this.cafestore.contracts[0].url
    //   } else {
    //     return '#'
    //   }
    // }
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
  },
  methods: {
    imgUrl(object) {
      if (object.type === 'fb') {
        return `<img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp"
                />`
      } else if (object.type === 'tw') {
        return `<img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/c7d035ba85f6486680c2facedecdcf4d.webp"
                />`
      } else {
        return `<img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 20px; height: 20px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp"
                />`
      }
    }
  }
}
</script>

<style scoped>
.col {
  display: flex;
  justify-content: center;
}
.register {
  width: 10rem;
  background: #fdfd96;
  /* padding: 10px 40px 10px 40px; */
  border-radius: 20px;
  color: #fff;
  /* margin-left: 5px; */
}
.register {
  padding: 5px;
  text-decoration: none;
  color: black;
}
.register a:link,
.register a:hover {
  color: black;
  text-decoration: none;
}

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

.content {
  padding: 20px;
}

.content p {
  padding: 20px 20px 0 20px;
  font-size: 20px;
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
