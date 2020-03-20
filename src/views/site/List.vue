<template>
  <div class="site-list-wrap" :class="`theme-${primaryTheme}`">
    <div class="side-bar">
      <a-button
          class="btn"
          type="primary"
          icon="plus"
          size="large"
          @click="add">新增
      </a-button>
      <a-button class="btn" size="large">北京门户</a-button>
      <a-button class="btn" size="large">山东门户</a-button>
      <a-button class="btn" size="large">海南门户</a-button>
      <a-button class="btn" size="large">深圳门户</a-button>
      <div>
        <a-tag
            class="color-item"
            :color="item.color" v-for="(item, index) in themeList"
            :key="index"
            @click="changeTheme(item.name)">
          <a-icon type="check" v-if="item.name === primaryTheme"></a-icon>
        </a-tag>
      </div>
    </div>
    <div class="main-content">
      <a-input-search placeholder="搜索标题" style="width:300px;margin-bottom:20px" size="large"/>
      <a-table
          :columns="columns"
          :rowKey="d=>d.id"
          :dataSource="data"
          :pagination="false"
          :loading="loading">
        <template #name="text,record">
          <router-link :to="'/site/design/'+record.id">{{text}}</router-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import {getSiteList} from '../../api/site'
  import {datetimeFormat} from '../../utils/util'

  export default {
    data() {
      return {
        data: [],
        loading: false,
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            scopedSlots: {customRender: 'name'},
            width: '60%'
          },
          {
            title: '状态',
            dataIndex: 'status',
            customRender: v => {
              if (v === 'publish') {
                return {children: '发布'}
              } else {
                return {children: '编辑中'}
              }
            }
          },
          {
            title: '最近更新',
            dataIndex: 'utime',
            customRender: v => ({children: datetimeFormat(v)})
          },
          {
            title: '创建时间',
            dataIndex: 'ctime',
            customRender: v => ({children: datetimeFormat(v)})
          }
        ],

        themeList: [
          {name: 'red', color: '#f55b54'},
          {name: 'green', color: '#87d068'},
          {name: 'yellow', color: '#f5e357'}
        ],
        primaryTheme: 'red'
      }
    },

    mounted() {
      this.loadData()
    },

    methods: {
      // 换肤
      changeTheme(theme) {
        this.primaryTheme = theme
      },

      loadData() {
        this.loading = true
        getSiteList().then(d => {
          this.data = d.data
          this.loading = false
        })
      },

      add() {
        const routeUrl = this.$router.resolve('/site/init')
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>

<style lang="less" scoped>
  .site-list-wrap {
    display: flex;
    height: 100vh;

    &.theme-red {
      background-color: lighten(#f55b54, 30);
    }

    &.theme-green {
      background-color: lighten(#87d068, 30);
    }

    &.theme-yellow {
      background-color: lighten(#f5e357, 30);
    }

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

  .color-item {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
</style>
