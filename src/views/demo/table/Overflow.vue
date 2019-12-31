<template>
  <a-table
      id="overflow-table"
      rowKey="id"
      :columns="columns"
      :dataSource="data"
      :pagination="false"/>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            width: '200px'
          },
          {
            title: '年龄',
            dataIndex: 'age',
            width: '40%'
          },
          {
            title: '地址',
            dataIndex: 'address',
            width: '40%'
          }
        ],
        data: [
          {
            id: 1,
            name: 'dewhuf',
            age: 32,
            address: 'New York No. 1 Lake Park'
          },
          {
            id: 2,
            name: 'Jim Green Jim Green Jim Green Jim Green Jim Green Jim Green Jim Green Jim Green Jim Green haha',
            age: 42,
            address: '发热功夫热管他如果恢复额外滚动条月问过他登云股份同一人非凡哥日月光复热，方' +
              '发热功夫热管他如果恢复额外滚动条月问过他登云股份同一人非凡哥日月光复热，方' +
              '发热功夫热管他如果恢复额外滚动条月问过他登云股份同一人非凡哥日月光复热，方'
          },
          {
            id: 3,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
          }
        ]
      }
    }
  }
</script>

<style lang="less">
  #overflow-table {
    table {
      table-layout: fixed;

      td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      td:hover {
        white-space: normal;
        text-overflow: inherit;
      }

      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
