<template>
  <div class="sbox-wrapper">
    <div class="sbox-tools">
      <a-tabs type="card" default-active-key="edit">
        <a-tab-pane tab="文件" key="file">
          <a-button type="primary" class="tool">新建</a-button>
          <a-button type="primary" class="tool">打开</a-button>
          <a-button type="primary" class="tool" @click="save">保存</a-button>
          <a-button type="primary" class="tool" @click="read">读取</a-button>
          <a-button type="primary" class="tool">另存为</a-button>
          <a-button type="primary" class="tool">重置</a-button>
          <a-button type="primary" class="tool">打印</a-button>
        </a-tab-pane>
        <a-tab-pane tab="编辑" key="edit">
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="16">
              <a-button type="primary" class="tool" @click="hh">水平分割</a-button>
              <a-button type="primary" class="tool" @click="vv">垂直分割</a-button>
              <a-button type="primary" class="tool" @click="add">新增</a-button>
              <a-button type="primary" class="tool" @click="remove">删除</a-button>
            </a-col>
            <a-col :span="6">
              <a-slider v-model="splitValue" @change="splitChange" :tipFormatter="v=>`${v}%`"/>
            </a-col>
            <a-col :span="2">占比：{{splitValue}}%</a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="更多" key="more">
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="16">
              <a-button type="primary" class="tool" @click="test">测试</a-button>
              <a-button type="primary" class="tool">调试</a-button>
            </a-col>
            <a-col :span="2">画布高度：</a-col>
            <a-col :span="6">
              <a-input v-model="mHeight"/>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div ref="main" class="sbox-main" :style="{height:mHeight + 'px'}">
      <s-box
          ref="sbox"
          :boxs="boxs"
          @lineMove="lineMove"
          @lineClick="lineClick"/>
      <resize-observer @notify="handleResize"/>
    </div>
  </div>
</template>

<script>
  import SBox from '../components/SBox/SBox'

  export default {
    data() {
      return {
        mHeight: 650,
        splitValue: 0,
        boxs: [],
        saveJson: ''
      }
    },

    components: {SBox},

    watch: {
      mHeight(v) {
        const main = this.$refs.main
        this.$refs.sbox.resizeRoot(main.clientWidth, v)
      }
    },

    methods: {
      handleResize() {
        const main = this.$refs.main
        this.$refs.sbox.resizeRoot(main.clientWidth, main.clientHeight)
      },

      test() {
        console.log(this.boxs)
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

      save() {
        this.saveJson = JSON.stringify(this.boxs)
        console.log("TCL: save -> json", this.saveJson)
        
        console.log(this.boxs)
      },

      read() {
        console.log(JSON.parse(this.saveJson))

      },

      remove() {
        this.$refs.sbox.deleteBox()
      },

      lineMove(v) {
        this.splitValue = Math.round(v)
      },

      lineClick(line) {
        this.splitValue = Math.round(line.pc)
      },

      splitChange(v) {
        this.$refs.sbox.splitBox(v)
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
    margin-bottom: 10px;

    .tool {
      margin-right: 10px;
    }
  }

  .sbox-main {
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
