<template>
  <div class="container">
    <div class="button-add">
      <nuxt-link
        v-if="$store.state.role === '2' || $store.state.role === '1'"
        to="/store/add"
      >
        <button type="button" class="btn btn-info">
          <i class="material-icons">
            note_add
          </i>
          Create Store
        </button>
      </nuxt-link>
    </div>
    <div class="row">
      <Store
        v-for="store in cafestore"
        :id="store.id"
        :key="store.id"
        :title="store.name"
        :excerpt="store.description"
        :img="store.logo"
      />
    </div>
    <br /><br /><br /><br /><br />
  </div>
</template>

<script>
import Store from '@/components/Store'
export default {
  components: {
    Store
  },
  async asyncData({ params, $axios }) {
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/`
    )
    return {
      cafestore: cafestore.data
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 5px;
}
.button-add {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
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
