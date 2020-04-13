<template>
  <div :id="id"></div>
</template>

<script>
  require('../../assets/demo/ewebeditor.js')

  export default {
    name: 'EWebEditor',

    data() {
      return {
        editor: null
      }
    },

    props: {
      id: String,

      height: {
        type: Number,
        default: 350,
      },

      width: {
        type: Number,
        default: 550,
      }
    },

    mounted() {
      EWEBEDITOR.BasePath = '/ewebeditor/'
      this.editor = EWEBEDITOR.Append(this.id, {style: 'coolblue', width: this.width, height: this.height})
    },

    methods: {
      instance() {
        return this.editor
      },

      setHTML(html) {
        this.editor.setHTML(html)
      },

      getHTML() {
        return this.editor.getHTML()
      },

      initHTML(html) {
        EWEBEDITOR.SetHtmlAsync(this.id, html)
      }
    }
  }
</script>