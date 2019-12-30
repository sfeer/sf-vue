<template>
  <div class="home">
    <a-table
        rowKey="id"
        :columns="columns"
        :dataSource="data"
        :pagination="false"/>
  </div>
</template>

<script>
  export default {
    name: 'home',

    data() {
      return {
        columns: [
          {
            title: '名称',
            dataIndex: 'name'
          },
          {
            title: '年龄',
            dataIndex: 'age'
          },
          {
            title: '地址',
            dataIndex: 'address'
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
            name: 'Jim Green',
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
