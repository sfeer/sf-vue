<template>
  <div class="main">
    <div class="box box1">
      <a-menu @click="onSelect" mode="horizontal" :selectable="false">
        <a-menu-item v-for="menu in menus" :key="menu.key" :data="menu.data">{{menu.title}}</a-menu-item>
        <a-sub-menu :key="'x'" title="子菜单">
          <a-menu-item :key="'x1'">子菜单项1</a-menu-item>
          <a-menu-item :key="'x2'">子菜单项2</a-menu-item>
          <a-menu-item :key="'x3'">子菜单项3</a-menu-item>
          <a-menu-item :key="'x4'">子菜单项4</a-menu-item>
          <a-menu-item :key="'x5'">子菜单项5</a-menu-item>
          <a-menu-item :key="'x6'">子菜单项6</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="box box2"></div>
  </div>
</template>

<script>
  import {Menu} from 'ant-design-vue'

  export default {
    data() {
      return {
        menus: [
          {key: 1, data: {a: 1, b: 2}, title: 'HAHA'},
          {key: 2, data: {a: 12, b: 22}, title: 'HEHE'}
        ]
      }
    },

    components: {
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.SubMenu.name]: Menu.SubMenu,
      [Menu.Divider.name]: Menu.Divider,
    },

    methods: {
      onSelect({item, key}) {
        console.log(item, key)
      }
    }
  }
</script>

<style lang="less" scoped>
  .box {
    position: absolute;
    width: 400px;
    padding-top: 152px;
    height: 200px;
  }

  .box {
    top: 100px;
    left: 200px;
    background: #8fd4ff;
  }

  .box2 {
    top: 300px;
    left: 200px;
    background: #ff7968;
  }
</style>
