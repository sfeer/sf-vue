<template>
  <a-menu @click="onSelect">
    <a-menu-item v-for="menu in menus" :key="menu.key" :data="menu.data">{{item.title}}</a-menu-item>
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
