# Json编辑器

## 技术选型

[jsoneditor](https://github.com/josdejong/jsoneditor/)

## 使用

```
npm i -S jsoneditor
```

```vue
<template>
  <div>
    <h2>使用HTML原生标签pre</h2>
    <pre>{{data}}</pre>
    <h2>使用vue-json-views</h2>
    <div>https://github.com/chenfengjw163/vue-json-viewer</div>
    <!--<json-view :data="data"/>-->
    <h2>使用jsoneditor</h2>
    <div class="list">
      <div class="cell" ref="jsoneditor1"></div>
      <div class="cell" ref="jsoneditor2"></div>
      <div class="cell" ref="jsoneditor3"></div>
    </div>
  </div>
</template>

<script>
  // import jsonView from 'vue-json-views'
  import JSONEditor from 'jsoneditor'
  import 'jsoneditor/dist/jsoneditor.css'

  export default {
    components: {
      jsonView
    },

    data() {
      return {
        data: {
          Array: [1, 2, 3],
          Boolean: true,
          Null: null,
          Number: 123,
          Object: {a: {x: 1, y: 2}, c: 'd'},
          String: 'Hello World',
        },

        options: {
          mode: 'code'
        }
      }
    },

    mounted() {
      new JSONEditor(this.$refs.jsoneditor1, {mode: 'text', mainMenuBar: false, statusBar: false}, this.data)
      new JSONEditor(this.$refs.jsoneditor2, {
        mode: 'view',
        mainMenuBar: false,
        navigationBar: false,
        statusBar: false
      }, this.data)
      new JSONEditor(this.$refs.jsoneditor3, {mode: 'code', mainMenuBar: false, statusBar: false}, this.data)
    }
  }
</script>

<style lang="less" scoped>
  .list {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    height: 400px;

    .cell {
      width: 30%;
    }
  }
</style>
```