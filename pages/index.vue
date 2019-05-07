<template>
  <div class="container">
    <GoogleMap
      ref="map"
      class="myMap"
      style="width:100%; height: 700px; border-radius:10px;"
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
        :custom-label="nameWithLang"
        placeholder="Select one"
        label="name"
        track-by="name"
        @input="filterCafe2"
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
      cafename: []
    }
  },
  async asyncData({ params, $axios }) {
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/`
    )
    return {
      cafestore: cafestore.data,
      project: 'project'
    }
  },
  mounted() {
    for (let i = 0; i < this.cafestore.length; i++) {
      this.cafename.push({
        name: this.cafestore[i].name
      })
    }
    this.$store.commit('SetUser', {
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token')
    })
  },
  methods: {
    filterCafeByPos() {
      this.$refs.map.getCafePos()
    },
    filterCafe2() {
      // this.$refs.map.getCafePos()
      this.$refs.map.getCafeName()
    },
    nameWithLang({ name }) {
      return `${name}`
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
