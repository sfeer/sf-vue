<template>
  <div class="design-wrapper">
    <div class="design-header">
      <a-button icon="left" type="link"/>
      <a-input class="title-input" v-show="editTitle" v-model="siteName" @blur="titleInputBlur"></a-input>
      <div class="title" v-show="!editTitle" @click="clickTitle">{{siteName}}</div>
      <div class="blank"></div>
      <a-dropdown :trigger="['click']">
        <span class="dropdown-title">文件</span>
        <a-menu slot="overlay">
          <a-sub-menu title="新建" key="1">
            <a-menu-item key="11">在线网页</a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="12">最近文件1</a-menu-item>
            <a-menu-item key="13">最近文件2</a-menu-item>
            <a-menu-item key="14">最近文件3</a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="15">导入JSON</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="2">保存为模版</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">导出JSON</a-menu-item>
          <a-menu-item key="4">发布</a-menu-item>
          <a-menu-item key="5">生成图片</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="6">重命名</a-menu-item>
          <a-menu-item key="7">打印</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown :trigger="['click']">
        <span class="dropdown-title">编辑</span>
        <a-menu slot="overlay">
          <a-menu-item key="1">撤销</a-menu-item>
          <a-menu-item key="2">重做</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">水平分割</a-menu-item>
          <a-menu-item key="4">垂直分割</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="5">插入区域</a-menu-item>
          <a-menu-item key="6">删除区域</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown :trigger="['click']" style="margin-right:50px">
        <span class="dropdown-title">工具</span>
        <a-menu slot="overlay">
          <a-menu-item key="1">调试</a-menu-item>
          <a-menu-item key="2">测试</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">浏览</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="design-tools">
      <a-button class="button" icon="redo" type="link" title="撤回"/>
      <a-button class="button" icon="undo" type="link" title="重做"/>
      <!-- 分割 -->
      <a-button class="button" icon="border-verticle" type="link" title="水平分割"/>
      <a-button class="button" icon="border-horizontal" type="link" title="垂直分割"/>
      <a-button class="button" icon="left" type="link" title="插入区域"/>
      <a-button class="button" icon="left" type="link" title="删除区域"/>
    </div>
    <!--
    <div class="sbox-tools">
      <a-tabs type="card" default-active-key="edit">
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
    -->
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
  import SBox from '../../components/SBox/SBox'
  import {getSite, getTemplateList, publishSite} from '../../api/site'
  import {Menu, Dropdown, Slider} from 'ant-design-vue'

  export default {
    data() {
      return {
        siteId: '',
        siteName: '无标题',

        editTitle: false,

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

    components: {
      SBox,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.SubMenu.name]: Menu.SubMenu,
      [Menu.Divider.name]: Menu.Divider,
      [Slider.name]: Slider
    },

    created() {
      const sid = this.$route.params.sid
      if (sid) {
        getSite(sid).then(res => {
          if (res.errcode === 0) {
            const d = res.data
            this.siteId = d.id
            this.siteName = d.name
            this.boxs = d.data
          } else {
            this.$message.error(res.errmsg)
          }
        })
      }

      document.title = this.siteName
    },

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
      },

      // 显示标题
      titleInputBlur() {
        this.editTitle = false
      },

      // 编辑标题
      clickTitle() {
        this.editTitle = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/site/sbox";

  .design-header {
    padding: 3px;
    height: 40px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;

    .title-input {
      width: 200px;
    }

    .title {
      width: 200px;
      height: 32px;
      padding: 6px 11px;
      cursor: text;

      &:hover {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
    }

    .blank {
      flex: auto;
    }

    .dropdown-title {
      margin: 0 5px;
      padding: 6px 11px;
      height: 32px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: #eee;
      }
    }
  }

  .design-tools {
    padding: 3px;
    height: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;

    .button {
      margin: 0 5px;
    }
  }
</style>
