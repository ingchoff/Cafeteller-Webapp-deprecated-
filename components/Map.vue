<template>
  <gmap-map ref="gmap" :center="center" :zoom="16">
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
      <div v-html="infoContent"></div>
    </gmap-info-window>
  </gmap-map>
</template>

<script>
export default {
  data() {
    return {
      // center: { lat: -3.350235, lng: 111.995865 },
      // mapTypeId: 'terrain',
      // markers: [
      //   { position: { lat: -0.48585, lng: 117.1466 } },
      //   { position: { lat: -6.9127778, lng: 107.6205556 } }
      // ]
      center: { lat: 52.51195, lng: 6.089625 },
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
      markers: [
        {
          name: 'Cafe 1',
          style: 'style 1',
          position: { lat: 13.723418599999999, lng: 100.4762319 }
        },
        {
          name: 'Cafe 2',
          style: 'style 2',
          position: { lat: 13.723418599999999, lng: 100.4862319 }
        },
        {
          name: 'Cafe 3',
          style: 'style 3',
          position: { lat: 13.723418599999999, lng: 100.4662329 }
        }
      ]
    }
  },
  mounted() {
    // this.getUserLocation()
    // set bounds of the map
    this.$refs.gmap.$mapPromise.then(map => {
      // eslint-disable-next-line no-undef
      // const bounds = new google.maps.LatLngBounds()
      // for (const m of this.markers) {
      //   bounds.extend(m.position)
      // }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
    })
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      // this.center = marker.position
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
    <div class="content">
      ${marker.style}
      <br>
    </div>
  </div>
`
    }
  }
}
</script>

<style scoped></style>
