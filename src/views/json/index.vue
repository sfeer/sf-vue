<template>
  <div>
    <h2>使用HTML原生标签pre</h2>
    <pre>{{data}}</pre>
    <h2>使用vue-json-views</h2>
    <div>https://github.com/chenfengjw163/vue-json-viewer</div>
    <json-view :data="data"/>
    <h2>使用jsoneditor</h2>
    <div ref="jsoneditor" style="width:600px;height:400px"></div>
  </div>
</template>

<script>
  import jsonView from 'vue-json-views'
  import JSONEditor from 'jsoneditor'
  import 'jsoneditor/dist/jsoneditor.css'

  export default {
    components: {
      jsonView
    },

    data() {
      return {
        data: {
          "Array": [1, 2, 3],
          "Boolean": true,
          "Null": null,
          "Number": 123,
          "Object": {"a": "b", "c": "d"},
          "String": "Hello World",
        },

        options: {
          mode: 'code'
        }
      }
    },

    mounted() {
      const container = this.$refs.jsoneditor
      new JSONEditor(container, this.options, this.data)
    }
  }
</script>