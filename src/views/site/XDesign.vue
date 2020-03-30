<template>
  <div>
    <a-button @click="addRow">添加一行</a-button>
    <x-box :box="tree"></x-box>
  </div>
</template>

<script>
  import XBox from '../../components/XBox/XBox'
  import {v4 as uuid} from 'uuid'

  export default {
    components: {XBox},

    data() {
      return {
        tree: {
          id: 1,
          way: 'v',
          child: [
            {
              id: 2,
              w: 0.5,
              way: 'h',
              child: [
                {id: 4, h: 300},
                {id: 5, h: 300}
              ]
            },
            {id: 3, w: 0.5, h: 650}
          ]
        }
      }
    },

    methods: {
      addRow() {
        const cloneTree = JSON.parse(JSON.stringify(this.tree))
        this.tree = {
          id: uuid().replace(/-/g, ''),
          way: 'h',
          child: [cloneTree, {
            id: uuid().replace(/-/g, ''),
            h: 300
          }]
        }
      }
    }
  }
</script>

<style lang="less">
  .x-box {
    display: flex;

    .leaf {
      background: #cccccc;
      margin: 3px;
      border-radius: 3px;
    }
  }
</style>