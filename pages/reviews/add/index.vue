<template>
  <div class="ce-block__content">
    <h2>Add New Review</h2>
    <ol>
      <li>ใส่บล็อกแรกเป็น Title</li>
      <li>
        จำเป็นต้องเลือกคาเฟ่ก่อน ถ้าไม่มีคาเฟ่
        <nuxt-link to="/store/add"><a href="#">สร้างคาเฟ่</a></nuxt-link>
      </li>
      <li>
        เลือกคาเฟ่
        <Multiselect v-model="value" :options="cafeName"></Multiselect>
      </li>
    </ol>
    <h4>Add Text by clicking space below</h4>
    <h6>----------------------------</h6>
    <div id="editorjs"></div>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-default save" @click="editorSave">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  // middleware: 'authenticated',
  components: {
    Multiselect
  },
  data() {
    return {
      value: ''
    }
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
    return {
      cafestore: cafestore.data,
      project: 'project'
    }
  },
  mounted() {
    this.$store.commit('SetUrl', this.$route.path)
    this.$store.commit('SetUser', {
      id: localStorage.getItem('uid'),
      username: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role')
    })
    if (!this.$store.state.token) {
      this.$router.push({
        name: 'login',
        params: { redirect: this.$store.state.redirectUrl }
      })
      this.$store.commit('ClearUser')
      localStorage.clear()
    } else if (
      this.$store.state.token !== null &&
      this.$store.state.role !== '2'
    ) {
      this.$router.push({
        name: 'login'
      })
      this.$store.commit('ClearUser')
      localStorage.clear()
    }
    // if (!localStorage.getItem('token')) {
    //   this.$router.push({
    //     name: 'login',
    //     params: { redirect: this.$store.state.redirectUrl }
    //   })
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
        return cafe.name === this.value
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
          const newReview = await this.$axios.post(
            `${this.$axios.defaults.baseURL}api/v1/reviews/`,
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
          // eslint-disable-next-line no-console
          console.log(this.newReview)
          this.$router.push({ path: `/reviews/${this.newReview.id}` })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err.request.response)
          alert('error')
        }
      })
    }
  }
}
</script>

<style scoped>
.save {
  border-width: 1px;
  border-color: gray;
  border-radius: 20px;
}
</style>
