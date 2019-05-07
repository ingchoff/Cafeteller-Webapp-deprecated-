/* eslint-disable vue/no-v-html */
<template>
  <gmap-map ref="gmap" :center="{ lat: myLat, lng: myLng }" :zoom="12">
    <gmap-marker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.position"
      @click="toggleInfoWindow(m, index)"
    >
    </gmap-marker>

    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen = false"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="infoContent"></div>
      <nuxt-link
        :to="{ name: 'store-id', params: { id: storeId } }"
        class="register"
      >
        <a>Our Store Page</a>
      </nuxt-link>
    </gmap-info-window>
  </gmap-map>
</template>

<script>
export default {
  components: {},
  props: {
    km: {
      type: Number,
      required: true
    },
    nameinput: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      storeId: 1,
      myLat: 0,
      myLng: 0,
      myCenter: {},
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      store: [],
      errorMsg: null
    }
  },
  mounted() {
    // this.getUserLocation()
    // set bounds of the map
    this.$refs.gmap.$mapPromise.then(map => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          this.myLat = position.coords.latitude
          this.myLng = position.coords.longitude
          await this.getCafePos()
          await this.getCafeName()
        })
      }
    })
  },
  methods: {
    async getCafePos() {
      try {
        const cafestore = await this.$axios.get(
          `${this.$axios.defaults.baseURL}api/v1/cafestore/filter/?lat=${
            this.myLat
          }&lon=${this.myLng}&km=${this.km}`
        )
        this.markers = cafestore.data.map(cafe => {
          return {
            id: cafe.id,
            name: cafe.name,
            position: { lat: cafe.latitude, lng: cafe.longitude }
          }
        })
        // eslint-disable-next-line no-console
        console.log('cafepos' + this.markers)
        this.$refs.gmap.$mapPromise.then(map => {
          if (this.markers.length === 0) {
            // eslint-disable-next-line no-undef
            const myLatLng = new google.maps.LatLng(this.myLat, this.myLng)
            map.panTo(myLatLng)
            this.errorMsg = 'ไม่พบร้านกาแฟใกล้เคียง'
          } else {
            // eslint-disable-next-line no-undef
            const bounds = new google.maps.LatLngBounds()
            for (const m of this.markers) {
              bounds.extend(m.position)
            }
            map.fitBounds(bounds)
            // this.markers.length = 0
          }
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.response)
      }
    },
    async getCafeName() {
      this.markers.length = 0
      const cafeName = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/cafestore/`
      )
      console.log(this.markers.length)
      for (let i = 0; i < cafeName.data.length; i++) {
        if (cafeName.data[i].name === this.nameinput.name) {
          // eslint-disable-next-line no-console
          this.markers.push({
            id: cafeName.data[i].id,
            name: cafeName.data[i].name,
            position: {
              lat: cafeName.data[i].latitude,
              lng: cafeName.data[i].longitude
            }
          })
          console.log(this.markers)
          this.$refs.gmap.$mapPromise.then(map => {
            if (this.markers.length === 0) {
              // eslint-disable-next-line no-undef
              const myLatLng = new google.maps.LatLng(this.myLat, this.myLng)
              map.panTo(myLatLng)
              this.errorMsg = 'ไม่พบร้านกาแฟใกล้เคียง'
            } else {
              // eslint-disable-next-line no-undef
              const bounds = new google.maps.LatLngBounds()
              for (const m of this.markers) {
                bounds.extend(m.position)
              }
              map.fitBounds(bounds)
            }
            // this.markers.length = 0
          })
        }
      }
    },
    arraysEqual(a, b) {
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false

      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.

      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
      }
      return true
    },
    toggleInfoWindow: function(marker, idx) {
      // this.center = marker.position
      this.storeId = marker.id
      this.infoWindowPos = marker.position
      this.infoContent = this.getInfoWindowContent(marker)
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    getInfoWindowContent: function(marker) {
      return `
        <div class="card-content text-center">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 font-weight-bold">${marker.name}</p>
            </div>
          </div>
        </div>
      `
      // return pinCard
    }
  }
}
</script>

<style scoped>
.register {
  width: 10rem;
  background: #fdfd96;
  /* padding: 10px 40px 10px 40px; */
  border-radius: 20px;
  color: black;
  text-decoration: none;
  /* margin-left: 5px; */
}
.register a:link,
.register a:hover {
  color: black;
  text-decoration: none;
}
</style>
