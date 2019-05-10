<template>
  <div class="ce-block__content">
    <h2>Edit Review</h2>
    <div id="editorjs"></div>
    <div class="d-flex align-items-center flex-column">
      <button type="button" class="btn btn-default save" @click="editorSave">
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
    if (!localStorage.getItem('token')) {
      this.$router.push({ path: '/login' })
    }
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

<style>
.save {
  border-width: 1px;
  border-color: gray;
  border-radius: 20px;
}
</style>
