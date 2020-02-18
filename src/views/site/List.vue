<template>
  <div>
    <a-button type="primary" icon="plus" @click="add">新增</a-button>
    <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
    ></a-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        columns: []
      }
    },

    created() {

    },

    methods: {
      add() {
        const routeUrl = this.$router.resolve('/site/design')
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>