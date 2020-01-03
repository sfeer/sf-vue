<template>
  <div class="sbox-wrapper">
    <div class="sbox-tools">
      <a-button type="primary" class="tool" @click="hh">水平分割</a-button>
      <a-button type="primary" class="tool" @click="vv">垂直分割</a-button>
      <a-button type="primary" class="tool" :disabled="true">预览</a-button>
      <a-button type="primary" class="tool" :disabled="true">保存</a-button>
      <a-button type="primary" class="tool" @click="addBox">新增</a-button>
      <a-button type="primary" class="tool" @click="deleteBox">删除</a-button>
      <a-button type="primary" class="tool" @click="test">测试</a-button>
    </div>
    <div ref="main" :style="{height:rootH+'px'}">
      <s-box :boxs="boxs" ref="sbox"/>
      <div class="resize-h" @mousemove></div>
      <resize-observer @notify="handleResize"/>
    </div>
  </div>
</template>

<script>
  import SBox from '../components/SBox/SBox'

  export default {
    data() {
      return {
        root: null,
        rootH: 600,
        boxs: []
      }
    },

    components: {SBox},

    methods: {
      handleResize() {
        const main = this.$refs.main
        this.$refs.sbox.resize(main.clientWidth, main.clientHeight)
      },

      test() {
        console.log(this.boxs)
      },

      hh() {
        this.$refs.sbox.splitH()
      },

      vv() {
        this.$refs.sbox.splitV()
      },

      addBox() {
        this.$refs.sbox.addBox()
      },

      deleteBox() {
        this.$refs.sbox.deleteBox()
      }
    }
  }
</script>

<style lang="less" scoped>
  .sbox-wrapper {
    padding: 10px;
  }

  .sbox-tools {
    margin-bottom: 10px;

    .tool {
      margin-right: 10px;
    }
  }

  .resize-h {
    height: 10px;
    background: #e65a44;
    cursor: ns-resize;
  }
</style>
