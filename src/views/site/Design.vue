<template>
  <div class="sbox-wrapper">
    <div class="sbox-tools">
      <a-tabs type="card" default-active-key="file">
        <a-tab-pane tab="文件" key="file">
          <a-button type="primary" class="tool" @click="addSbox">新建</a-button>
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
              <a-button type="primary" class="tool" @click="publish">发布</a-button>
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
    <a-modal class="sbox-modal" :width="960" v-model="newModalVisible" :closable="false" :footer="null">
      <template v-if="historys.length>0">
        <div class="row-title">最近打开</div>
        <div class="row">
          <div class="item" v-for="t in historys" :key="t.id" @click="templateClick(t)">
            <div class="item-title">{{t.name}}</div>
            <img :src="t.img" :alt="t.name">
          </div>
        </div>
      </template>
      <div class="row-title">常用</div>
      <div class="row">
        <div class="item" v-for="t in templates" :key="t.id">
          <img :src="t.img" :alt="t.name">
          <div class="item-title">{{t.name}}</div>
        </div>
      </div>
    </a-modal>
    <a-modal class="sbox-modal" :width="920" v-model="debugModalVisible" :closable="false" :footer="null">
      <pre>{{boxs}}</pre>
    </a-modal>
  </div>
</template>

<script>
  import {v4 as uuid} from 'uuid'
  import SBox from '../../components/SBox/SBox'
  import {getTemplateList, publishSite} from '../../api/site'

  export default {
    data() {
      return {
        siteId: uuid().replace(/-/g, ''),
        siteName: '',

        mHeight: 650,
        splitValue: 0,
        boxs: [],
        saveJson: '',

        templates: [],
        historys: [],
        newModalVisible: false,
        debugModalVisible: false
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
        this.debugModalVisible = true
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

      // 新建布局
      addSbox() {
        this.newModalVisible = true
        getTemplateList().then(d => {
          this.templates = d
        })
      },

      templateClick(template) {
        this.boxs = template.data
        this.newModalVisible = false
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
      },

      // 发布
      publish() {
        // TODO 使用Drawer抽屉组件
        publishSite({
          id: this.siteId,
          name: this.siteName,
          boxs: this.boxs
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/site/sbox";
</style>
