<template>
  <div>
    <e-web-editor ref="ed1" id="editor1"></e-web-editor>
    <e-web-editor ref="ed2" id="editor2"></e-web-editor>
    <button @click="test1">test1</button>
    <button @click="test2">test2</button>
    <button @click="hello1">hello1</button>
    <button @click="hello2">hello2</button>
  </div>

</template>

<script>
  import EWebEditor from '../../../components/RichTextEditor/EWebEditor'

  export default {
    components: {EWebEditor},

    mounted() {
      this.$refs.ed1.initHTML('1111init')
      this.$refs.ed2.initHTML('2222init')
    },

    methods: {
      test1() {
        alert(this.$refs.ed1.getHTML())
      },

      test2() {
        alert(this.$refs.ed2.getHTML())
      },

      hello1() {
        this.$refs.ed1.setHTML('<p>hello world</p><p>ewebeditor showtime!!!111111</p>')
      },

      hello2() {
        this.$refs.ed2.setHTML('<p>hello world</p><p>ewebeditor showtime!!!222222</p>')
      }
    }
  }
</script>