<template>
  <div class="container">
    <div id="editorjs"></div>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-default save">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const EditorJS = require('@editorjs/editorjs')
    const Header = require('@editorjs/header')
    const ImageTool = require('@editorjs/image')

    let editor = new EditorJS({ // eslint-disable-line
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
      }
    })
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
