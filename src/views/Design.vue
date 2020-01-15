<template>
  <div class="sbox-wrapper" @mousemove="handleDrag" @mouseup="handleDragEnd">
    <div class="sbox-tools">
      <a-button type="primary" size="small" class="tool" @click="hh">水平分割</a-button>
      <a-button type="primary" size="small" class="tool" @click="vv">垂直分割</a-button>
      <a-button type="primary" size="small" class="tool" :disabled="true">预览</a-button>
      <a-button type="primary" size="small" class="tool" :disabled="true">保存</a-button>
      <a-button type="primary" size="small" class="tool" @click="add">新增</a-button>
      <a-button type="primary" size="small" class="tool" @click="remove">删除</a-button>
      <a-button type="primary" size="small" class="tool" @click="test">测试</a-button>
      <a-button type="link" size="small" class="tool" icon="down">更多</a-button>
    </div>
    <div ref="main" class="sbox-main" :style="{height:mHeight + 'px'}">
      <s-box :boxs="boxs" ref="sbox"/>
      <resize-observer @notify="handleResize"/>
    </div>
    <div class="resize-h" @mousedown="handleDragStart"></div>
  </div>
</template>

<script>
  import SBox from '../components/SBox/SBox'

  export default {
    data() {
      return {
        mHeight: 650,
        resizeH: false,
        boxs: []
      }
    },

    components: {SBox},

    methods: {
      handleResize() {
        const main = this.$refs.main
        this.$refs.sbox.resizeRoot(main.clientWidth, main.clientHeight)
      },

      test() {
        console.log(this.boxs, this.$refs.main.clientHeight)
      },

      hh() {
        this.$refs.sbox.splitBoxH()
      },

      vv() {
        this.$refs.sbox.splitBoxV()
      },

      add() {
        this.$refs.sbox.addRow()
        this.mHeight = this.boxs.find(b => b.parent === undefined).h
      },

      remove() {
        this.$refs.sbox.deleteBox()
      },

      handleDragStart() {
        this.resizeH = true
      },

      handleDragEnd() {
        this.resizeH = false
      },

      handleDrag(e) {
        if (this.resizeH) {
          const rect = this.$el.getBoundingClientRect()
          this.mHeight = e.pageY - rect.top - 52
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sbox-wrapper {
    padding: 10px;
    height: 100vh;
  }

  .sbox-tools {
    float: right;

    .tool {
      margin-right: 10px;
    }
  }

  .sbox-main {
    margin-top: 34px;
    position: relative;
  }

  .resize-h {
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background: #e65a44;
    cursor: ns-resize;
  }
</style>
