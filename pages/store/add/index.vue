<template>
  <div class="container">
    <h3>Create Store</h3>
    <div class="form-group">
      <label for="title">Title</label>
      <div v-if="error != null" style="color: red;">
        {{ error.name }}
      </div>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Placeholder Cafe"
        v-model="title"
      />
    </div>

    <div class="form-group">
      <label for="description">คำอธิบาย</label>
      <div v-if="error != null" style="color: red;">
        {{ error.description }}
      </div>
      <textarea
        v-model="description"
        class="form-control"
        id="description"
        rows="3"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="logo">Logo</label>
      <div v-if="error != null" style="color: red;">
        {{ error.logo }}
      </div>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        ref="logo"
        @change="handleFileUpload"
      />
    </div>

    <h6>Address: (Drag marker or Click on the map):</h6>
    <div v-if="error != null" style="color: red;">
      {{ error.address }}
    </div>
    <p>{{ results }}</p>
    <gmap-map
      ref="mymap"
      :center="mapStartLocation"
      :zoom="17"
      style="width: 100%;
      height: 300px"
      @click="display"
    >
      <gmap-marker
        ref="marker"
        :position="mapStartLocation"
        :draggable="true"
        @dragend="updateCoordinates"
      />
    </gmap-map>
    <h6 style="margin-top: 10px;">Style ของร้าน</h6>
    <div v-if="error != null" style="color: red;">
      {{ error.styles }}
    </div>
    <Multiselect
      v-model="stylesList"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="code"
      :options="styleName"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    />

    <button
      @click="sendToBackend"
      style="margin-top: 10px"
      type="button"
      class="btn btn-light"
    >
      Submit
    </button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  mounted() {
    this.$refs.mymap.$mapPromise.then(map => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.mapStartLocation['lat'] = position.coords.latitude
          this.mapStartLocation['lng'] = position.coords.longitude
          map.panTo(this.mapStartLocation)
          this.coordinates = this.mapStartLocation
          this.getAddress()
        })
      }
    })
  },
  data() {
    return {
      title: '',
      description: '',
      logo: '',
      mapStartLocation: {
        lat: 0,
        lng: 0
      },
      coordinates: null,
      results: '',
      stylesList: [],
      contracts: [
        {
          url: '',
          type: ''
        },
        {
          url: '',
          type: ''
        },
        {
          url: '',
          type: ''
        }
      ],
      error: null
    }
  },
  async asyncData({ params, $axios }) {
    let style = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/styles/`
    )
    return {
      styles: style.data
    }
  },
  methods: {
    async updateCoordinates(location) {
      this.coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }
      await this.getAddress()
    },
    async display(e) {
      this.$refs.marker.$markerPromise.then(marker => {
        marker.setPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        })
      })
      this.coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      await this.getAddress()
    },
    async getAddress() {
      let latLng = this.coordinates.lat + ',' + this.coordinates.lng
      let key = 'AIzaSyA5LMLVAp3KulY-bUsYigDdN1OiWlnQQ_A'
      let api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${key}`
      console.log(api)
      let address = await this.$axios.get(api)
      this.results = address.data.results[0].formatted_address
    },
    addTag(newTag) {
      this.stylesList.push(newTag)
    },
    handleFileUpload() {
      this.logo = this.$refs.logo.files[0]
    },
    sendToBackend() {
      let data = new FormData()
      data.append('name', this.title)
      data.append('description', this.description)
      data.append('address', this.results)
      data.append('latitude', this.coordinates.lat)
      data.append('longitude', this.coordinates.lng)
      data.append('logo', this.logo)

      this.$axios
        .post(`${this.$axios.defaults.baseURL}api/v1/cafestore/`, data, {
          headers: {
            authorization: 'token' + localStorage.getItem('token')
          }
        })
        .then(store => {
          let update = {}
          update['styles'] = this.stylesList.map(st => {
            return st.name
          })
          console.log(update)
          this.$axios
            .patch(
              `${this.$axios.defaults.baseURL}api/v1/cafestore/${
                store.data.id
              }/`,
              update,
              {
                headers: {
                  authorization: 'token' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                }
              }
            )
            .catch(error => {
              console.log(error)
            })
          this.$router.push({
            name: 'store-id',
            params: { id: store.data.id }
          })
        })
        .catch(err => {
          alert('error please check field!')
          this.error = JSON.parse(err.request.response)
        })
    }
  },
  computed: {
    styleName() {
      return this.styles.map(style => {
        return { name: style.title, code: style.title }
      })
    }
  }
}
</script>