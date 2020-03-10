<template>
  <div class="design-wrapper">
    <div class="design-header">
      <a-button icon="left" type="link"/>
      <a-input ref="title" class="title-input" v-show="editTitle" v-model="siteName" @blur="titleInputBlur"></a-input>
      <div class="title" v-show="!editTitle" @click="clickTitle">{{siteName}}</div>
      <div class="auto-save-text">{{autoSaveText}}</div>
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
          <a-menu-item key="6" @click="showSidebar('历史记录')">历史记录</a-menu-item>
          <a-menu-item key="7" @click="rename">重命名</a-menu-item>
          <a-menu-item key="8">打印</a-menu-item>
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
          <a-menu-divider/>
          <a-menu-item key="8" @click="clearMain">清空</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown :trigger="['click']">
        <span class="dropdown-title">工具</span>
        <a-menu slot="overlay">
          <a-menu-item key="1">调试</a-menu-item>
          <a-menu-item key="2" @click="showSidebar('测试')">测试</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">浏览</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="design-tools">
      <a-button-group class="group">
        <a-button icon="left" title="撤销"></a-button>
        <a-button icon="right" title="重做"></a-button>
      </a-button-group>
      <a-button-group class="group">
        <a-button icon="border-verticle" @click="hh" title="水平分割"/>
        <a-button icon="border-horizontal" @click="vv" title="垂直分割"/>
      </a-button-group>
      <a-button-group class="group">
        <a-button icon="plus-square" @click="add" title="插入区域"/>
        <a-button icon="delete" @click="remove" title="删除区域"/>
      </a-button-group>
    </div>
    <div ref="main" class="sbox-main" :style="{height:mHeight + 'px',margin:'30px 0'}">
      <s-box
          ref="sbox"
          :boxs="boxs"
          @lineMove="lineMove"
          @lineClick="lineClick"
          @updated="mainUpdated"/>
      <resize-observer @notify="handleResize"/>
    </div>

    <a-drawer
        :title="sidebarTitle"
        placement="right"
        :closable="false"
        :visible="sidebarVisible">
      <template v-if="sidebarTitle==='历史记录'">
        <!-- todo 历史列表 -->
      </template>
      <pre v-else-if="sidebarTitle==='测试'">{{boxs}}</pre>
    </a-drawer>
  </div>
</template>

<script>
  import SBox from '../../components/SBox/SBox'
  import {getSite, publishSite, saveSite} from '../../api/site'
  import {Menu, Dropdown, Slider, Drawer} from 'ant-design-vue'

  // TODO 工具栏添加分割百分比调节器，选择组件按钮，设置画布总高度按钮
  // TODO 历史记录

  export default {
    data() {
      return {
        siteId: this.$route.params.sid,
        siteName: '无标题',

        editTitle: false,

        autoSaveText: '',

        sidebarTitle: '功能栏',
        sidebarVisible: false,

        mHeight: 650,
        mHeightVisible: false,

        splitValue: 0,
        boxs: []
      }
    },

    components: {
      SBox,
      [Drawer.name]: Drawer,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.SubMenu.name]: Menu.SubMenu,
      [Menu.Divider.name]: Menu.Divider,
      [Slider.name]: Slider
    },

    created() {
      if (this.siteId) {
        getSite(this.siteId).then(res => {
          if (res.errcode === 0) {
            const d = res.data
            this.siteName = d.name
            this.boxs = d.boxs
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
      // 画布更新（防抖）
      mainUpdated() {
        this.mainTimeout && clearTimeout(this.mainTimeout)
        this.mainTimeout = setTimeout(() => {
          saveSite({
            id: this.siteId,
            name: this.siteName,
            boxs: this.boxs
          })
        }, 800)
      },

      handleResize() {
        const main = this.$refs.main
        this.$refs.sbox.resizeRoot(main.clientWidth, main.clientHeight)
      },

      showSidebar(title) {
        this.sidebarTitle = title
        this.sidebarVisible = true
      },

      rename() {
        this.editTitle = true
        this.$nextTick(() => {
          this.$refs.title.focus()
          this.$refs.title.select()
        })
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

      lineMove(v) {
        this.splitValue = Math.round(v)
      },

      lineClick(line) {
        this.splitValue = Math.round(line.pc)
      },

      // 发布
      publish() {
        publishSite({
          id: this.siteId,
          name: this.siteName,
        })
      },

      // 显示标题
      titleInputBlur() {
        this.editTitle = false
      },

      // 编辑标题
      clickTitle() {
        this.editTitle = true
        this.$nextTick(() => {
          this.$refs.title.focus()
        })
      },

      // 清空画布
      clearMain() {
        this.boxs = []
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
    padding: 10px 5px;
    display: flex;

    .group {
      margin: 0 5px;
    }
  }
</style>
