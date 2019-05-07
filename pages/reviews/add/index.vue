<template>
  <div class="container">
    <div id="editorjs"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const EditorJS = require('@editorjs/editorjs')
    let editor = new EditorJS({ // eslint-disable-line
      holderId: 'editorjs',
      tools: {
        header: {
          class: Header, // eslint-disable-line
          inlineToolbar: true
        }
      }
    })
  }
}
</script>
