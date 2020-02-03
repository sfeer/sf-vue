<template>
  <div>
    <json-view :data="json"/>
  </div>
</template>

<script>
  import jsonView from 'vue-json-views'

  export default {
    components: {
      jsonView
    },

    data() {
      return {
        json: {
          a: 1,
          b: 2,
          array: [1, 2, 3]
        }
      }
    }
  }
</script>