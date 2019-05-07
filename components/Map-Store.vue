<template>
  <gmap-map id="myMap" ref="gmap" :center="storePos" :zoom="16">
    <gmap-marker :position="storePos" @click="toggleInfoWindow(storePos)">
    </gmap-marker>

    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen = false"
    >
      <div v-html="infoContent"></div>
    </gmap-info-window>
  </gmap-map>
</template>

<script>
export default {
  props: {
    storePos: {
      type: Object,
      required: true
    },
    storeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // center: { lat: -3.350235, lng: 111.995865 },
      // mapTypeId: 'terrain',
      // markers: [
      //   { position: { lat: -0.48585, lng: 117.1466 } },
      //   { position: { lat: -6.9127778, lng: 107.6205556 } }
      // ]
      // center: { lat: 52.51195, lng: 6.089625 },
      img:
        'https://static.wixstatic.com/media/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.jpg/v1/fill/w_400,h_408,al_c,q_80,usm_0.66_1.00_0.01/03d7e2_2449f64a10564eebb4dab2af2f8ccfa9~mv2.webp',
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
      }
    }
  },
  mounted() {
    // this.getUserLocation()
    // set bounds of the map
    this.$refs.gmap.$mapPromise.then(map => {
      // eslint-disable-next-line no-undef
      map.panTo(this.storePos)
      // const bounds = new google.maps.LatLngBounds()
      // for (const m of this.markers) {
      //   bounds.extend(m.position)
      // }
      // map.fitBounds(bounds)
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     map.panTo({
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude
      //     })
      //   })
      // }
    })
  },
  methods: {
    toggleInfoWindow: function(position) {
      // this.center = marker.position
      this.infoWindowPos = position
      this.infoContent = this.getInfoWindowContent(this.storeName)

      // check if its the same marker that was selected if yes toggle
      // if (this.currentMidx === idx) {
      this.infoWinOpen = !this.infoWinOpen
      // if different marker set infowindow to open and reset current marker index
      // else {
      // this.infoWinOpen = true
      // this.currentMidx = idx
    },
    getInfoWindowContent: function(name) {
      return `
  <div class="card-content text-center">
    <div class="media">
      <div class="media-content">
        <div class="img" :style="{ backgroundImage: 'url(' + img + ')' }" />
        <p class="title is-4 font-weight-bold">${name}</p>
      </div>
    </div>
  </div>
`
    }
  }
}
</script>

<style scoped>
#myMap {
  border-radius: 50px;
}
</style>
