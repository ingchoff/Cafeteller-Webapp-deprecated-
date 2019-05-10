<template>
  <div class="ce-block__content">
    <div class="button-add">
      <nuxt-link
        v-if="$store.state.role === '2'"
        :to="{ name: 'reviews-id', params: { id: $route.params.id } }"
      >
        <button type="button" class="btn btn-danger">
          <i class="material-icons">
            arrow_back
          </i>
          Cancel
        </button>
      </nuxt-link>
    </div>
    <h2>Edit Review</h2>
    <div id="editorjs"></div>
    <div class="d-flex align-items-center flex-column">
      <button class="btn btn-default save" type="button" @click="editorSave">
        Save
      </button>
    </div>
    เลือกคาเฟ่
    <Multiselect v-model="title" :options="cafeName"></Multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  // middleware: 'authenticated',
  components: {
    Multiselect
  },
  computed: {
    cafeName() {
      return this.cafestore.map(cafe => {
        return cafe.name
      })
    }
  },
  async asyncData({ params, $axios }) {
    const cafestore = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/cafestore/`
    )
    const reviewData = await $axios.get(
      `${$axios.defaults.baseURL}api/v1/reviews/${params.id}/`
    )
    return {
      title: cafestore.data.find(cafe => {
        return cafe.id === reviewData.data.store
      }).name,
      reviewData: JSON.parse(reviewData.data.content),
      cafestore: cafestore.data
    }
  },
  mounted() {
    this.$store.commit('SetUrl', this.$route.path)
    this.$store.commit('SetUser', {
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
    if (!this.$store.state.token) {
      this.$router.push({
        name: 'login',
        params: { redirect: this.$store.state.redirectUrl }
      })
    }
    // if (!localStorage.getItem('token')) {
    //   this.$router.push({ path: '/login' })
    // }
    const EditorJS = require('@editorjs/editorjs')
    const Header = require('@editorjs/header')
    const ImageTool = require('@editorjs/image')

    this.editor = new EditorJS({
      // eslint-disable-line
      holderId: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'https://cafeteller-api.herokuapp.com/api/v1/upload/' // Your backend file uploader endpoint
            }
          }
        }
      },
      autofocus: true,
      data: this.reviewData,
      onReady: () => {
        this.$el.querySelector('.codex-editor__redactor').style.paddingBottom =
          '50px'
      }
    })
  },
  methods: {
    editorSave() {
      // get selected store id
      let selected = this.cafestore.filter(cafe => {
        return cafe.name === this.title
      })
      if (selected.length > 0) {
        selected = selected[0]
      } else {
        alert('กรุณาเลือกคาเฟ่ก่อน')
        return
      }
      this.editor.save().then(async data => {
        try {
          const title = data.blocks[0].data.text
          const content = JSON.stringify(data)
          const newReview = await this.$axios.patch(
            `${this.$axios.defaults.baseURL}api/v1/reviews/${
              this.$route.params.id
            }/`,
            {
              title: title,
              content: content,
              store: selected.id
            },
            {
              headers: {
                authorization: 'token' + localStorage.getItem('token')
              }
            }
          )
          this.newReview = newReview.data
          console.log(this.newReview)
          this.$router.push({ path: `/reviews/${this.newReview.id}` })
        } catch (err) {
          console.log(err.request.response)
          alert('error')
        }
      })
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
  justify-content: flex-start;
  padding: 8px;
}
.save {
  border-width: 1px;
  border-color: gray;
  border-radius: 20px;
}
</style>
