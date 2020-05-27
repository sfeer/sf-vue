# Markdown编辑器

## 技术选型

[simplemde](https://simplemde.com/)

## 使用方式

```
npm i -S vue-simplemde github-markdown-css
```

```vue
<template>
  <div>
    <vue-simplemde v-model="content" preview-class="markdown-body"/>
    <div>Markdown 内容</div>
    <pre>{{content}}</pre>
  </div>
</template>

<script>
  import VueSimplemde from 'vue-simplemde'

  export default {
    components: {VueSimplemde},

    data() {
      return {
        content: ''
      }
    }
  }
</script>

<style lang="less">
  @import "~simplemde/dist/simplemde.min.css";
  @import '~github-markdown-css';
</style>
```