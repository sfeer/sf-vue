<template>
  <a-menu @click="onSelect">
    <a-menu-item
        v-for="item in menus"
        :key="item.key"
        :data="item.data"
        xx="123"
    >{{item.title}}
    </a-menu-item>
  </a-menu>
</template>

<script>
  export default {
    data() {
      return {
        menus: [
          {key: 1, data: {a: 1, b: 2}, title: 'HAHA'},
          {key: 2, data: {a: 12, b: 22}, title: 'HEHE'}
        ]
      }
    },

    methods: {
      onSelect({item, key}) {
        console.log(item, key)
      }
    }
  }
</script>
