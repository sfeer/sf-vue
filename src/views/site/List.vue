<template>
  <div class="site-list-wrap">
    <div class="side-bar">
      <a-button
          class="btn"
          type="primary"
          icon="plus"
          size="large"
          @click="add">新增</a-button>
      <a-button class="btn" size="large">北京门户</a-button>
      <a-button class="btn" size="large">山东门户</a-button>
      <a-button class="btn" size="large">海南门户</a-button>
      <a-button class="btn" size="large">深圳门户</a-button>
    </div>
    <div class="main-content">
      <a-input-search placeholder="搜索标题" style="width:300px;margin-bottom:20px" size="large"/>
      <a-table
          :columns="columns"
          :rowKey="d=>d.id"
          :dataSource="data"
          :pagination="false"
          :loading="loading"/>
    </div>
  </div>
</template>

<script>
  import {getSiteList} from '../../api/site'

  export default {
    data() {
      return {
        data: [],
        loading: false,
        columns: [
          {title: '名称', dataIndex: 'name', width: '60%'},
          {title: '状态', dataIndex: 'status'},
          {title: '作者', dataIndex: 'author'},
          {title: '最近更新', dataIndex: 'time'}
        ]
      }
    },

    mounted() {
      this.loadData()
    },

    methods: {
      loadData() {
        this.loading = true
        getSiteList().then(d => {
          this.data = d.data
          this.loading = false
        })
      },

      add() {
        const routeUrl = this.$router.resolve('/init')
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>

<style lang="less" scoped>
  .site-list-wrap {
    display: flex;
    height: 100vh;

    .side-bar {
      width: 250px;
      border-right: 1px solid #ddd;
      padding: 20px;

      .btn {
        width: 100%;
        margin-bottom: 20px;
      }
    }

    .main-content {
      flex: auto;
      margin: 20px;
    }
  }
</style>
