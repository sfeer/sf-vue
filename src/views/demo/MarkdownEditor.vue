<template>
  <div class="markdown-body">
    <textarea ref="mde"></textarea>
    <div>Markdown 内容</div>
    <pre>{{mdValue}}</pre>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde'

  export default {
    data() {
      return {
        simplemde: null,
        mdValue: ''
      }
    },

    mounted() {
      this.simplemde = new SimpleMDE({element: this.$refs.mde})

      this.simplemde.codemirror.on('change', () => {
        this.mdValue = this.simplemde.value()
      })
    }
  }
</script>

<style lang="less">
  @import "~simplemde/dist/simplemde.min.css";
  @import '~github-markdown-css';
</style>