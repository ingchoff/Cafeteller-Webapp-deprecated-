<template>
  <div class="container">
    <div class="content-top">
      <div style="font-size:36px;">
        {{ cafestore.name }}
        <span class="badge badge-info ml-3">
          {{ cafestore.subscriber.length }} Subscriber</span
        >
      </div>
    </div>
    <div class="row">
      <div class="col content-left p-3">
        <!-- <div
          v-if="cafestore.logo !== ''"
          class="img"
          :style="{ backgroundImage: 'url(' + cafestore.logo + ')' }"
          style="border-top-left-radius:8px;border-top-right-radius:8px;"
        /> -->
        <div
          class="img"
          :style="{
            backgroundImage: 'url(' + cafestore.logo + ')'
          }"
          style="border-radius:50%"
        />
        <button
          v-if="is_sub === false"
          type="button"
          class="btn btn-danger"
          @click="subscribe"
        >
          Subscribe +
        </button>
        <button v-else type="button" class="btn btn-secondary">
          Subscribed
        </button>
        <hr class="my-4" />
        <div class="description">" {{ cafestore.description }} "</div>
      </div>
      <div class="col-7 content-right p-4">
        <i class="material-icons" style="font-size: 26px;">
          contacts
        </i>
        <span style="font-size: 26px;" class="font-italic"> contract</span>
        <hr />
        <ul class="social">
          <li v-for="url in cafestore.contracts" :key="url.id">
            <a :href="'https://' + url.url">
              <div v-html="imgUrl(url)"></div>
            </a>
          </li>
        </ul>
        <i class="material-icons" style="font-size: 26px;color:red;">
          place
        </i>
        <span style="font-size: 26px;" class="font-italic"> Address</span>
        <hr />
        <p class="text-muted font-italic">{{ cafestore.address }}</p>
        <GoogleMap
          style="width: 100%; height: 400px; margin-top: 20px;"
          :pos="{
            lat: cafestore.latitude,
            lng: cafestore.longitude
          }"
          :name="cafestore.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/Map-Store'
export default {
  components: {
    GoogleMap
  },
  data() {
    return {
      is_sub: false,
      token: ''
    }
  },
  async asyncData({ params, $axios }) {
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/${params.id}`
    )
    return {
      cafestore: cafestore.data,
      project: 'project'
    }
  },
  async mounted() {
    // const myuser = await this.$axios.get(
    //   `${this.$axios.defaults.baseURL}api/v1/myuser/`,
    //   {
    //     headers: {
    //       Authorization: 'token' + this.$store.state.token
    //     }
    //   }
    // )
    // return {
    //   myuser: myuser.data
    // }
    // for (let i = 0; i < this.cafestore.subscriber.length; i++) {
    //   if (this.cafestore.subscriber[i] === myuser.data.id) {
    //     this.is_sub = true
    //   } else {
    //     this.is_sub = false
    //   }
    // }
  },
  methods: {
    async subscribe() {
      try {
        await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/v1/subscribe/store/${
            this.cafestore.id
          }/`,
          {
            headers: {
              Authorization: 'token' + this.$store.state.token
            }
          }
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.request.response)
        this.is_sub = true
      }
    },
    imgUrl(object) {
      if (object.type === 'fb') {
        return `<img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 50px; height: 50px; object-fit: cover;"
                    src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_25,h_25,al_c,q_80,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp"
                />`
      } else if (object.type === 'tw') {
        return `<img
                    class="img-social"
                    data-type="image"
                    itemprop="image"
                    style="width: 50px; height: 50px; object-fit: cover;"
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
.register a {
  text-decoration: none;
  color: red;
  font-size: 15px;
}
.row {
  background-color: #ffdfd3;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.content-top {
  margin-bottom: 1.1rem;
}

.content-left {
  background-color: #fffaf0;
  border-radius: 8px;
}

.content-left img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}

.content-right {
  background-color: white;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.social {
  padding: 0;
}

.social li {
  display: inline-block;
  margin-right: 30px;
}

.img {
  width: 320px;
  height: 340px;
  transition: all 0.3s ease-in-out;
}

.img-social {
  opacity: 1;
  transition: 0.3s;
}

.img-social:hover {
  opacity: 0.6;
}

.description {
  width: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  padding: 2.5px;
}
</style>
