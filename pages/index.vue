<template>
  <div class="container">
    <GoogleMap
      ref="map"
      class="myMap"
      style="width:100%; height: 600px; border-radius:10px;"
      :km="kmInput"
      :nameinput="value"
    />
    <div class="filter">
      <p>ค้นหาร้านในรัศมี {{ kmInput }} กิโลเมตร</p>
      <div class="form-group">
        <input
          id="formControlRange"
          v-model.number="kmInput"
          type="range"
          class="form-control-range"
          @change="filterCafeByPos"
        />
      </div>
      <p>ค้นหาร้านที่มีชื่อร้าน :</p>
      <multiselect
        v-model="value"
        :options="cafename"
        placeholder="Select one"
        label="name"
        track-by="name"
        @input="filterCafeByName"
      ></multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import GoogleMap from '@/components/Map'
export default {
  components: {
    GoogleMap,
    Multiselect
  },
  data() {
    return {
      kmInput: 1,
      value: null,
      cafename: [],
      cafeinfo: []
    }
  },
  async asyncData({ params, $axios }) {
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/`
    )
    return {
      cafestore: cafestore.data
    }
  },
  async mounted() {
    this.$store.commit('SetUrl', this.$route.path)
    for (let i = 0; i < this.cafestore.length; i++) {
      this.cafename.push({
        name: this.cafestore[i].name
      })
    }
    try {
      const chatToken = await this.$axios.get(
        `${this.$axios.defaults.baseURL}api/v1/get/token`,
        {
          headers: {
            Authorization: 'token' + this.$store.state.token
          }
        }
      )
      this.cafeinfo = chatToken.data
    } catch (err) {
      console.log('chattoken' + err.request.response)
    }
    this.$store.commit('SetChat', this.cafeinfo)
  },
  methods: {
    filterCafeByPos() {
      this.$refs.map.getCafePos()
    },
    filterCafeByName() {
      // this.$refs.map.getCafePos()
      this.$refs.map.getCafeName()
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.container {
  margin: 0 auto 5rem auto;
  display: flex;
  justify-content: center;
}

.myMap {
  transition: box-shadow 0.3s;
}

.myMap:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.filter {
  width: 400px;
  height: 400px;
  background-color: #f4efde;
  border-radius: 20px;
  margin-left: 15px;
  margin-right: -15px;
  text-align: center;
  padding: 15px 20px 15px 20px;
}
</style>
