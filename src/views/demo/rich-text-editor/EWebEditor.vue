<template>
  <div>
    <div id="editor1"></div>
    <button @click="test">test</button>
    <button @click="hello">hello</button>
  </div>

</template>

<script>
  window.EWEBEDITOR_BASEPATH = '/ewebeditor/'
  require('../../../assets/demo/ewebeditor.js')

  export default {
    data() {
      return {
        editor: null,
        initData: '<p>初始化数据!!!</p>'
      }
    },

    mounted() {
      this.editor = EWEBEDITOR.Append('editor1',
        {style: 'coolblue', width: 550, height: 350}, this.initData)
      console.log(this.editor)
    },

    methods: {
      test() {
        alert(this.editor.getHTML())
      },

      hello() {
        this.editor.setHTML('<p>hello world</p><p>ewebeditor showtime!!!</p>')
      }
    }
  }
</script>