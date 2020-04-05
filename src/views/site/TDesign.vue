<template>
  <div class="design-wrapper" @click="mainClick">
    <div class="design-header">
      <a-button icon="left" type="link" @click="goback"/>
      <a-input ref="title" class="title-input" v-show="editTitle" v-model="siteName" @blur="titleInputBlur"></a-input>
      <div class="title" v-show="!editTitle" @click="clickTitle">{{siteName}}</div>
      <div class="auto-save-text" style="line-height:33px">{{autoSaveText}}</div>
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
          <a-menu-item key="6" @click="showSidebar('history')">历史记录</a-menu-item>
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
          <a-menu-item key="5" @click="add">全局插入区域</a-menu-item>
          <a-menu-item key="6">删除区域</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="8" @click="clearMain">清空</a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown :trigger="['click']">
        <span class="dropdown-title">工具</span>
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="showSidebar('test')">测试</a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="2">浏览</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="design-tools">
      <a-button-group class="group" v-if="historys.length>0" style="margin-right:20px">
        <a-button :disabled="!canHisRevoke" @click="hisRevoke">撤销</a-button>
        <a-button :disabled="!canHisRedo" @click="hisRedo">重做</a-button>
      </a-button-group>

      <a-button-group class="group" v-if="toolType==='box'">
        <a-button @click="hh">水平分割</a-button>
        <a-button @click="vv">垂直分割</a-button>
      </a-button-group>

      <div v-else-if="toolType==='line'" style="line-height: 32px">{{splitValue}}</div>
    </div>
    <div ref="main" class="design-main">
      <t-box
        ref="sbox"
        :boxs="boxs"
        @boxClick="boxClick"
        @boxSelect="boxSelect"
        @boxRightClick="boxRightClick"
        @update="mainUpdate"/>
      <a-menu
        class="content-menu"
        :style="contentMenu"
        v-show="contentMenuVisible"
        :selectable="false">
        <a-menu-item key="1" @click="contentMenuClick('hh')">水平分割</a-menu-item>
        <a-menu-item key="2" @click="contentMenuClick('vv')">垂直分割</a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3">上方插入</a-menu-item>
        <a-menu-item key="4">下方插入</a-menu-item>
        <a-menu-item key="5">左边插入</a-menu-item>
        <a-menu-item key="6">右边插入</a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="7" @click="contentMenuClick('remove')">删除</a-menu-item>
      </a-menu>
    </div>

    <a-drawer
      :title="sidebarTitle"
      placement="right"
      :width="320"
      :closable="false"
      @close="sidebarClose"
      :visible="sidebarVisible">
      <template v-if="sidebarType==='history'">
        <!-- TODO 历史列表 -->
      </template>
      <template v-else-if="sidebarType==='widget'">
        <div class="widget" @click="addWidget('Aa')">AA</div>
        <div class="widget" @click="addWidget('Bb')">BB</div>
      </template>
      <template v-else-if="sidebarType==='test'">
        <pre>{{boxs}}</pre>
      </template>
    </a-drawer>
  </div>
</template>

<script>
  import TBox from '../../components/Box/TBox'
  import {getSite, publishSite, saveSite} from '../../api/site'
  import {Menu, Dropdown, Slider, Drawer} from 'ant-design-vue'
  import {timeFormat} from '../../utils/util'

  // TODO 工具栏添加分割百分比调节器，设置画布总高度按钮

  export default {
    data() {
      return {
        siteId: this.$route.params.sid,
        siteName: '无标题',

        editTitle: false,

        autoSaveText: '',

        sidebarType: null,
        sidebarVisible: false,

        mHeight: 650,

        splitValue: 0,
        boxs: [],

        toolType: null,

        // 右键菜单样式
        contentMenu: {},
        contentMenuVisible: false,

        historys: [],
        hisIndex: 0,
        useHistory: false // 是否在进行历史记录操作
      }
    },

    components: {
      TBox,
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

    computed: {
      sidebarTitle() {
        if (this.sidebarType === 'widget') {
          return '选择组件'
        } else if (this.sidebarType === 'test') {
          return '测试'
        } else if (this.sidebarType === 'history') {
          return '历史记录'
        } else {
          return ''
        }
      },

      // 是否可以撤销
      canHisRevoke() {
        return this.historys.length > 0 && this.hisIndex > 0
      },

      // 是否可以重做
      canHisRedo() {
        return this.historys.length - this.hisIndex > 1
      },
    },

    methods: {
      mainClick() {
        this.contentMenuVisible = false
      },

      // 历史记录撤销
      hisRevoke() {
        this.useHistory = true
        this.hisIndex -= 1
        const boxs = this.historys[this.hisIndex].boxs
        // 从历史记录中克隆
        this.boxs = JSON.parse(JSON.stringify(boxs))
      },

      // 历史记录重做
      hisRedo() {
        this.useHistory = true
        this.hisIndex += 1
        const boxs = this.historys[this.hisIndex].boxs
        // 从历史记录中克隆
        this.boxs = JSON.parse(JSON.stringify(boxs))
      },

      // 右键菜单点击事件
      contentMenuClick(type) {
        if (type === 'vv') {
          this.vv()
        } else if (type === 'hh') {
          this.hh()
        } else if (type === 'remove') {
          this.remove()
        }
        this.contentMenuVisible = false
      },

      // 显示小部件
      boxSelect() {
        this.sidebarVisible = true
        this.sidebarType = 'widget'
      },

      // 区域绑定小部件
      addWidget(name) {
        this.$refs.sbox.addWidget(name)
        this.sidebarVisible = false
      },

      // 获取鼠标坐标
      _getPosition(event) {
        const rect = this.$el.getBoundingClientRect()
        return {ex: event.clientX - rect.left, ey: event.clientY - rect.top}
      },

      // 右键菜单
      boxRightClick(e) {
        const {ex, ey} = this._getPosition(e)
        this.contentMenu = {top: ey + 'px', left: ex + 'px'}
        this.contentMenuVisible = true
      },

      boxClick() {
        this.toolType = 'box'
        this.contentMenuVisible = false
      },

      // 返回列表页面
      goback() {
        this.$router.replace('/site')
      },

      // 数据更新
      mainUpdate() {
        saveSite({
          id: this.siteId,
          name: this.siteName,
          boxs: this.boxs
        }).then(() => {
          const time = new Date().getTime()
          this.autoSaveText = '自动保存：' + timeFormat(time)

          if (this.useHistory) {
            this.useHistory = false // 重置
          } else {
            const clone = JSON.parse(JSON.stringify(this.boxs))
            // 覆盖当前历史记录回撤的位置
            this.historys.splice(
              this.hisIndex + 1,
              this.historys.length - 1 - this.hisIndex,
              {boxs: clone, time: time}
            )
            this.hisIndex = this.historys.length - 1
          }
        })
      },

      showSidebar(type) {
        this.sidebarType = type
        this.sidebarVisible = true
      },

      rename() {
        this.editTitle = true
        this.$nextTick(() => {
          this.$refs.title.focus()
          this.$refs.title.select()
        })
      },

      // 水平分割
      hh() {
        this.$refs.sbox.splitBoxH()
      },

      // 垂直分割
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

      lineDown() {
        this.toolType = 'line'
        this.contentMenuVisible = false
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
        this.$refs.sbox.clearRoot()
      },

      sidebarClose() {
        this.sidebarVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>
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

  .design-main {
    .content-menu {
      width: 150px;
      position: absolute;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-shadow: 0 0 5px 5px #eee;
    }
  }

  .widget {
    width: 250px;
    height: 180px;
    background-color: #dcf5ff;
    margin-bottom: 20px;
    cursor: pointer;
  }
</style>
