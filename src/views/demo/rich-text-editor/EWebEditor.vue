<template>
  <div>
    <textarea name="content1" style="display:none">
      <p>111</p>
    </textarea>
    <iframe ID="eWebEditor1" src="/ewebeditor/ewebeditor.htm?id=content1&style=coolblue" frameborder="0"
            scrolling="no" width="500" HEIGHT="350"></iframe>
    <button @click="test">test</button>
  </div>

</template>

<script>
  require('../../../assets/demo/ewebeditor')

  export default {
    data() {
      return {
        editor: null
      }
    },

    mounted() {
      this.editor = EWEBEDITOR.Instances["content1"]
      console.log(this.editor)
    },

    methods: {
      test() {
        console.log(this.editor.getHTML())
      }
    }
  }
</script>