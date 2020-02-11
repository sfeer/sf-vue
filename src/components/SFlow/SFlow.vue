<template>
  <div class="sflow-wrapper" :class="mode+'-mode'">
    <div v-if="isDesignMode" class="sflow-header">
      <div class="sflow-tools">
        <div
            class="tool"
            v-for="(tool,index) in tools"
            :key="'tool-'+index"
            :title="tool.name">
          <slot name="tool" :tool="tool">
            <a-icon :class="['tool-icon',{disabled:tool.disabled}]" :type="tool.icon" @click="toolClick(tool)"/>
          </slot>
        </div>

        <!-- 临时关闭内置工具栏
          <div class="tool" title="新建">
            <a-icon class="tool-icon" type="file"/>
          </div>
          <div class="tool" title="打开">
            <a-icon class="tool-icon" type="folder"/>
          </div>
          <div class="tool" title="保存">
            <a-icon class="tool-icon" type="save"/>
          </div>
          <div class="tool" title="撤回">
            <a-icon class="tool-icon" type="rollback"/>
          </div>
          <div class="tool" title="重做">
            <a-icon class="tool-icon" style="transform:rotateY(180deg)" type="rollback"/>
          </div>
          <div class="tool" title="刷新">
            <a-icon class="tool-icon" type="reload"/>
          </div>
         -->
      </div>
      <a-breadcrumb separator=">" class="sflow-path">
        <a-breadcrumb-item v-for="p in path">{{p.name}}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="sflow-body">
      <div v-if="isDesignMode" class="sflow-sidebar">
        <div class="sflow-opers">
          <div
              class="oper"
              title="选择"
              :class="activeOper===null?'active':null"
              @click="operClick(null)">
            <a-icon class="oper-icon" style="transform:rotate(-45deg)" type="arrow-up"/>
            <span v-show="!sideBarCollapse" class="oper-name">选择</span>
          </div>
          <div class="oper" title="连线" :class="isDrawLink?'active':null" @click="operClick('draw-link')">
            <a-icon class="oper-icon" type="rise"/>
            <span v-show="!sideBarCollapse" class="oper-name">连线</span>
          </div>
        </div>

        <div class="sflow-items">
          <div
              class="item"
              v-for="(item,index) in items"
              :title="item.name"
              :key="'item-'+index"
              @mousedown="itemDragStart(item)">
            <a-icon class="item-icon" :type="item.icon?item.icon:'setting'"/>
            <span v-show="!sideBarCollapse" class="item-name">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div
          ref="flow"
          class="sflow-view"
          :class="[isDrawLink?'draw-link':null, mode+'-mode']"
          @mousedown="handleDragStart"
          @mousemove="handleDrag"
          @mouseup="handleDragEnd"
          @click="handleClick">
        <div class="link-layer">
          <svg>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"
                      markerUnits="userSpaceOnUse">
                <path d="M0,8 L8,4 L0,0 z" class="link-marker-arrow"/>
              </marker>
              <marker id="arrow-warning" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"
                      markerUnits="userSpaceOnUse">
                <path d="M0,8 L8,4 L0,0 z" class="link-marker-arrow-warning"/>
              </marker>
              <marker id="arrow-error" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"
                      markerUnits="userSpaceOnUse">
                <path d="M0,8 L8,4 L0,0 z" class="link-marker-arrow-error"/>
              </marker>
              <marker id="arrow-init" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"
                      markerUnits="userSpaceOnUse">
                <path d="M0,8 L8,4 L0,0 z" class="link-marker-arrow-init"/>
              </marker>
            </defs>

            <g v-for="link in links" :key="link.id">
              <path
                  :class="linkClassData(link)"
                  :d="link.path"/>
              <path
                  v-if="isDesignMode"
                  class="link-selecter"
                  :d="link.path"
                  @click.stop="linkClick(link)"
                  @dblclick.stop="linkDblclick(link)"/>
              <text
                  class="link-name"
                  :x="link.cx"
                  :y="link.cy"
                  dy="-4">{{link.name}}
              </text>
            </g>

            <path
                v-if="isDesignMode"
                class="link-draw"
                :d="drawLinkPath"/>
          </svg>

          <template v-if="isDesignMode">
            <div
                v-show="activeLink"
                class="link-tools"
                :style="linkToolStyle">
              <div class="tool tool-v" @click="switchVLink"></div>
              <div class="tool tool-h" @click="switchHLink"></div>
              <div class="tool tool-l" @click="switchLLink"></div>
              <div class="tool tool-x" @click="deleteLink"></div>
            </div>
            <div
                v-show="activeLink"
                class="link-drag"
                @mousedown.prevent="linkDragStart"
                :style="linkDragStyle">
            </div>
          </template>
        </div>

        <div class="node-layer">
          <div
              v-for="node in nodes"
              :key="node.id"
              :class="nodeClassData(node)"
              :style="nodeStyle(node)"
              @click.stop="nodeClick(node)"
              @dblclick.stop="nodeDblclick(node)">

            <template v-if="node.free">
              <div class="node-drag" v-show="!node.free.show">
                <a-icon class="node-icon" :type="node.icon?node.icon:'setting'"/>
              </div>
              <div class="node-inner">
                <s-flow
                    v-if="node.free.show"
                    :nodes="node.free.nodes"
                    :links="node.free.links"
                    :node-class="nodeClass"
                    mode="view"/>
                <div v-else>{{node.name}}</div>
                <a-button
                    shape="circle"
                    :icon="node.free.show?'minus':'plus'"
                    type="primary"
                    class="free-flow-btn"
                    @click="showFreeFlow(node)"/>
              </div>
            </template>

            <template v-else-if="node.sub">
              <div class="node-drag" @mousedown="nodeDragStart(node, $event)">
                <a-icon class="node-icon" :type="node.icon?node.icon:'setting'"/>
              </div>
              <div class="node-inner">
                <s-flow
                    v-if="node.sub"
                    :nodes="node.sub.nodes"
                    :links="node.sub.links"
                    :node-class="nodeClass"
                    mode="view"/>
              </div>
            </template>

            <template v-else>
              <div class="node-drag" @mousedown="nodeDragStart(node, $event)">
                <slot name="icon" :node="node">
                  <a-icon class="node-icon" :type="node.icon?node.icon:'setting'"/>
                </slot>
              </div>
              <div class="node-inner">
                <slot name="node" :node="node">{{node.name}}</slot>
              </div>
            </template>

            <template v-if="isDesignMode">
              <a-icon
                  class="node-close"
                  v-show="activeNode===node.id"
                  type="close"
                  @click="deleteNode"/>
              <a-icon
                  class="node-resize"
                  v-show="activeNode===node.id"
                  type="arrows-alt"
                  @mousedown="nodeResizeStart(node)"/>
            </template>
          </div>

          <div v-if="subSize" class="sub-box" :style="{width:subSize.w+'px',height:subSize.h+'px'}"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  /**
   * TODO
   * 1. 图标默认使用ant-design的type，插槽的方式完成自定义图标
   * 2. 顶部工具栏插槽自定义，保留必要的工具
   */

  import {getXOverRange, getYOverRange} from '../../utils/util'
  import uuid from 'uuid'

  export default {
    name: 'SFlow',

    data() {
      return {
        activeNode: null,
        dragNode: null,
        dragNodeX: 0,
        dragNodeY: 0,
        highlightNode: null,
        resizeNode: null,

        activeLink: null,
        dragLink: null,

        dragItem: null,
        dragItemNode: null,
        activeOper: null,

        drawLinkNode: null,
        drawLinkX: 0,
        drawLinkY: 0,
        drawLinkPath: null,

        flows: []
      }
    },

    props: {
      nodes: {
        type: Array,
        default: () => []
      },

      links: {
        type: Array,
        default: () => []
      },

      items: {
        type: Array,
        default: () => []
      },

      tools: {
        type: Array,
        default: () => []
      },

      path: {
        type: Array,
        default: () => []
      },

      defaultNodeWidth: {
        type: Number,
        default: 100
      },

      defaultNodeHeight: {
        type: Number,
        default: 40
      },

      minNodeWidth: {
        type: Number,
        default: 80
      },

      minNodeHeight: {
        type: Number,
        default: 30
      },

      sideBarCollapse: {
        type: Boolean,
        default: false
      },

      // 模式： 设计-design 监控-play 查看-view
      mode: {
        type: String,
        default: 'design'
      },

      nodeClass: {
        type: [String, Function],
        default: 'node'
      },

      linkClass: {
        type: [String, Function],
        default: 'link'
      },

      subSize: {
        type: Object,
        default: () => undefined
      }
    },

    watch: {
      links(v) {
        v.forEach(l => {
          if (l.path === undefined) {
            this.handleLink(l)
          }
        })
      }
    },

    computed: {
      nodeMap() {
        const res = {}
        this.nodes.forEach(o => {
          res[o.id] = o
        })
        return res
      },

      linkMap() {
        const res = {}
        this.links.forEach(o => {
          res[o.id] = o
        })
        return res
      },

      itemMap() {
        const res = {}
        this.items.forEach(o => {
          res[o.id] = o
        })
        return res
      },

      isDesignMode() {
        return this.mode === 'design'
      },

      isPlayMode() {
        return this.mode === 'play'
      },

      isViewMode() {
        return this.mode === 'view'
      },

      // 连线工具栏样式
      linkToolStyle() {
        if (this.activeLink) {
          const link = this.linkMap[this.activeLink]
          return {
            left: link.cx + 'px',
            top: (link.cy + 4) + 'px'
          }
        } else {
          return null
        }
      },

      // 连线拖拽控制器样式
      linkDragStyle() {
        if (this.activeLink) {
          const link = this.linkMap[this.activeLink],
            ss = this.nodeMap[link.s],
            tt = this.nodeMap[link.t]

          if (link.way === 'v') {
            const s = ss.y + ss.h / 2,
              t = tt.y + tt.h / 2
            return {
              left: (link.cx - 5) + 'px',
              top: (s > t ? t : s) + 'px',
              width: '10px',
              height: (s > t ? s - t : t - s) + 'px',
              cursor: 'e-resize'
            }
          } else if (link.way === 'h') {
            const s = ss.x + ss.w / 2,
              t = tt.x + tt.w / 2
            return {
              left: (s > t ? t : s) + 'px',
              top: (link.cy - 5) + 'px',
              width: (s > t ? s - t : t - s) + 'px',
              height: '10px',
              cursor: 'n-resize'
            }
          } else {
            return {display: 'none'}
          }
        } else {
          return null
        }
      },

      isDrawLink() {
        return this.activeOper === 'draw-link'
      }
    },

    created() {
      // 处理连线数据
      this.links.forEach(l => this.handleLink(l))
    },

    methods: {
      // 自由流程开关
      showFreeFlow(node) {
        const w = node.free.w, h = node.free.h
        node.free.w = node.w
        node.free.h = node.h
        node.w = w
        node.h = h
        node.free.show = !node.free.show
      },

      // 节点样式
      nodeStyle(node) {
        return {
          left: node.x + 'px',
          top: node.y + 'px',
          width: node.w + 'px',
          height: node.h + 'px',
          minWidth: this.minNodeWidth + 'px',
          minHeight: this.minNodeHeight + 'px'
        }
      },

      // 节点风格
      nodeClassData(node) {
        const classArr = []

        if (typeof this.nodeClass === 'function') {
          classArr.push(this.nodeClass(node), 'node')
        } else if (typeof this.nodeClass === 'string') {
          classArr.push(this.nodeClass)
        }

        if (this.isDesignMode) {
          classArr.push({
            active: this.activeNode === node.id,
            highlight: this.highlightNode === node.id
          })
        } else if (this.isPlayMode) {
          classArr.push(node.play)
        }

        return classArr
      },

      // 节点单击
      nodeClick(node) {
        if (this.isDesignMode) {
          this.activeNode = node.id
          this.activeLink = null
        }
        this.$emit('nodeClick', node)
      },

      // 节点双击
      nodeDblclick(node) {
        this.$emit('nodeDblclick', node)
      },

      // 节点开始拖拽
      nodeDragStart(node, e) {
        if (!this.isDrawLink) {
          // 连线模式下禁止节点拖动
          this.dragNode = node.id
          const rect = this.$refs.flow.getBoundingClientRect(),
            ex = e.pageX - rect.left, ey = e.pageY - rect.top
          this.dragNodeX = ex - node.x
          this.dragNodeY = ey - node.y
        }
      },

      // 主面板拖拽开始事件
      handleDragStart(e) {
        if (this.isDesignMode) {
          if (this.isDrawLink && this.highlightNode) {
            // 绘制连线
            this.drawLinkNode = this.highlightNode
            const rect = this.$refs.flow.getBoundingClientRect(),
              ex = e.pageX - rect.left, ey = e.pageY - rect.top
            this.drawLinkX = ex
            this.drawLinkY = ey
          }
        }
      },

      // 主面板区域鼠标移动事件，须谨慎使用
      handleDrag(e) {
        if (this.isDesignMode) {
          const rect = this.$refs.flow.getBoundingClientRect(),
            ex = e.pageX - rect.left, ey = e.pageY - rect.top

          if (this.dragNode) { // 拖拽节点
            const node = this.nodeMap[this.dragNode],
              rect = this.$refs.flow.getBoundingClientRect(),
              ex = e.pageX - rect.left, ey = e.pageY - rect.top
            node.x = ex - this.dragNodeX
            node.y = ey - this.dragNodeY

            this.links.filter(
              link => link.s === this.dragNode || link.t === this.dragNode
            ).forEach(link => {
              this.handleLink(link)
            })
          }

          if (this.resizeNode) { // 重置节点大小
            const node = this.nodeMap[this.resizeNode],
              ww = ex + 7 - node.x, hh = ey + 7 - node.y
            node.w = ww > this.minNodeWidth ? ww : this.minNodeWidth
            node.h = hh > this.minNodeHeight ? hh : this.minNodeHeight

            this.links.filter(
              link => link.s === this.resizeNode || link.t === this.resizeNode
            ).forEach(link => {
              this.handleLink(link)
            })
          }

          if (this.dragLink) { // 拖拽连线
            const link = this.linkMap[this.dragLink]
            if (link.way === 'v') {
              link.cx = ex
            } else if (link.way === 'h') {
              link.cy = ey
            }

            this.handleLink(link)
          }

          if (this.isDrawLink) { // 绘制连线
            const node = this.nodes.find(n => n.x < ex && (n.x + n.w) > ex && n.y < ey && (n.y + n.h) > ey)
            this.highlightNode = node ? node.id : null

            if (this.drawLinkNode) {
              this.drawLinkPath = `M ${this.drawLinkX} ${this.drawLinkY} L ${ex} ${ey}`
            }
          }

          if (this.dragItem) { // 拖拽节点项
            const item = this.itemMap[this.dragItem]
            if (this.dragItemNode) {
              this.dragItemNode.x = ex - this.defaultNodeWidth / 2
              this.dragItemNode.y = ey - this.defaultNodeHeight / 2
            } else {
              this.dragItemNode = Object.assign({}, item, {
                id: 'node_' + uuid().replace(/-/g, ''),
                x: ex - this.defaultNodeWidth / 2,
                y: ey - this.defaultNodeHeight / 2,
                w: this.defaultNodeWidth,
                h: this.defaultNodeHeight,
              })
              this.nodes.push(this.dragItemNode)
              this.$emit('nodeCreate', this.dragItemNode)
            }
          }
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        if (this.isDesignMode) {
          if (this.dragNode) { // 拖拽节点
            this.dragNode = null
          }

          if (this.resizeNode) { // 重置节点大小
            this.resizeNode = null
          }

          if (this.dragLink) { // 拖拽连线
            this.dragLink = null
          }

          if (this.isDrawLink && this.drawLinkNode) { // 绘制连线
            if (this.highlightNode) {
              // 判断连线是否存在
              if (!this.links.some(l => (l.s === this.drawLinkNode && l.t === this.highlightNode) || (l.s === this.highlightNode && l.t === this.drawLinkNode))) {
                if (this.highlightNode !== this.drawLinkNode) {
                  const link = {
                    id: 'link_' + uuid().replace(/-/g, ''),
                    name: '',
                    s: this.drawLinkNode,
                    t: this.highlightNode,
                    way: 'l'
                  }
                  this.links.push(link)
                  this.$emit('linkCreate', link)
                  this.handleLink(link)
                }
              }
            }

            this.drawLinkNode = null
            this.drawLinkPath = null
          }

          if (this.dragItem) {
            this.dragItem = null
            this.dragItemNode = null
          }
        }
      },

      // 主面板点击事件
      handleClick() {
        if (this.activeLink) {
          this.activeLink = null
        }

        if (this.activeNode) {
          this.activeNode = null
        }

        this.$emit('viewClick')
      },

      // 删除节点
      deleteNode() {
        this.$emit('nodeDelete', this.activeNode)
        this.nodes.splice(this.nodes.findIndex(o => o.id === this.activeNode), 1)
        const newLinks = this.links.filter(link => link.s !== this.activeNode && link.t !== this.activeNode)
        if (newLinks.length > 0) {
          this.links.splice(0, this.links.length, ...newLinks)
        }
        this.activeNode = null
      },

      // 开始节点重定义大小
      nodeResizeStart(node) {
        this.resizeNode = node.id
      },

      // 连线单击
      linkClick(link) {
        if (this.isDesignMode) {
          this.activeLink = link.id
          this.activeNode = null
        }
      },

      // 连线双击
      linkDblclick(link) {
        this.$emit('linkDblclick', link)
      },

      // 连线风格
      linkClassData(link) {
        const classArr = []

        if (typeof this.linkClass === 'function') {
          classArr.push(this.linkClass(link), 'link')
        } else if (typeof this.linkClass === 'string') {
          classArr.push(this.linkClass)
        }

        if (this.isDesignMode) {
          classArr.push({active: this.activeLink === link.id})
        } else if (this.isPlayMode) {
          classArr.push(link.play)
        }

        return classArr
      },

      // 计算直线路径
      calcLPath(link) {
        const ss = this.nodeMap[link.s], tt = this.nodeMap[link.t], s = [], t = []

        if (ss.x > tt.x + tt.w) {
          s[0] = ss.x
          t[0] = tt.x + tt.w
        } else if (ss.x + ss.w > tt.x) {
          s[0] = t[0] = getXOverRange(ss, tt)
        } else {
          s[0] = ss.x + ss.w
          t[0] = tt.x
        }

        if (ss.y > tt.y + tt.h) {
          s[1] = ss.y
          t[1] = tt.y + tt.h
        } else if (ss.y + ss.h > tt.y) {
          s[1] = t[1] = getYOverRange(ss, tt)
        } else {
          s[1] = ss.y + ss.h
          t[1] = tt.y
        }

        this.$set(link, 'cx', s[0] / 2 + t[0] / 2)
        this.$set(link, 'cy', s[1] / 2 + t[1] / 2)
        this.$set(link, 'path', `M ${s[0]} ${s[1]} L ${t[0]} ${t[1]}`)
      },

      // 计算水平折线路径
      calcHPath(link) {
        const s = this.nodeMap[link.s], t = this.nodeMap[link.t],
          m = link.cy ? link.cy : getYOverRange(s, t)

        const pp = []
        if (s.y > m) { // 北
          pp.push([s.x + s.w / 2, s.y], [s.x + s.w / 2, m])
        } else if (m > s.y + s.h) { // 南
          pp.push([s.x + s.w / 2, s.y + s.h], [s.x + s.w / 2, m])
        } else {
          if (s.x + s.w / 2 > t.x + t.w / 2) { // 西
            pp.push([s.x, m])
          } else { // 东
            pp.push([s.x + s.w, m])
          }
        }

        if (t.y > m) { // 北
          pp.push([t.x + t.w / 2, m], [t.x + t.w / 2, t.y])
        } else if (m > t.y + t.h) { // 南
          pp.push([t.x + t.w / 2, m], [t.x + t.w / 2, t.y + t.h])
        } else {
          if (s.x + s.w / 2 < t.x + t.w / 2) { // 西
            pp.push([t.x, m])
          } else { // 东
            pp.push([t.x + t.w, m])
          }
        }

        const aa = pp.filter(o => o[1] === m)
        this.$set(link, 'cx', aa[0][0] / 2 + aa[1][0] / 2)
        this.$set(link, 'cy', m)
        this.$set(link, 'path', 'M ' + pp.map(o => `${o[0]} ${o[1]}`).join(' L '))
      },

      // 计算垂直折线路径
      calcVPath(link) {
        const s = this.nodeMap[link.s], t = this.nodeMap[link.t],
          m = link.cx ? link.cx : getXOverRange(s, t)

        const pp = []
        if (s.x > m) { // 西
          pp.push([s.x, s.y + s.h / 2], [m, s.y + s.h / 2])
        } else if (m > s.x + s.w) { // 东
          pp.push([s.x + s.w, s.y + s.h / 2], [m, s.y + s.h / 2])
        } else {
          if (s.y + s.h / 2 > t.y + t.h / 2) { // 北
            pp.push([m, s.y])
          } else { // 南
            pp.push([m, s.y + s.h])
          }
        }

        if (t.x > m) { // 西
          pp.push([m, t.y + t.h / 2], [t.x, t.y + t.h / 2])
        } else if (m > t.x + t.w) { // 东
          pp.push([m, t.y + t.h / 2], [t.x + t.w, t.y + t.h / 2])
        } else {
          if (s.y + s.h / 2 < t.y + t.h / 2) { // 北
            pp.push([m, t.y])
          } else { // 南
            pp.push([m, t.y + t.h])
          }
        }

        const aa = pp.filter(o => o[0] === m)
        this.$set(link, 'cx', m)
        this.$set(link, 'cy', aa[0][1] / 2 + aa[1][1] / 2)
        this.$set(link, 'path', 'M ' + pp.map(o => `${o[0]} ${o[1]}`).join(' L '))
      },

      // 计算连线路径
      handleLink(link) {
        link.way = link.way || 'l'
        if (link.way === 'l') { // 直线
          this.calcLPath(link)
        } else if (link.way === 'h') { // 水平折线
          this.calcHPath(link)
        } else if (link.way === 'v') { // 垂直折线
          this.calcVPath(link)
        }
      },

      // 切换成垂直折线
      switchVLink() {
        const link = this.linkMap[this.activeLink]

        if (link.way !== 'v') {
          link.way = 'v'
          link.cx = null
          this.handleLink(link)
        }
      },

      // 切换成水平折线
      switchHLink() {
        const link = this.linkMap[this.activeLink]

        if (link.way !== 'h') {
          link.way = 'h'
          link.cy = null
          this.handleLink(link)
        }
      },

      // 切换成直连线
      switchLLink() {
        const link = this.linkMap[this.activeLink]

        if (link.way !== 'l') {
          link.way = 'l'
          this.handleLink(link)
        }
      },

      // 删除连线
      deleteLink() {
        this.links.splice(this.links.findIndex(o => o.id === this.activeLink), 1)
        this.activeLink = null
      },

      // 连线开始拖拽
      linkDragStart() {
        this.dragLink = this.activeLink
      },

      // 节点项拖拽开始事件
      itemDragStart(item) {
        this.dragItem = item.id
        this.activeOper = null
      },

      // 操作项单击
      operClick(tool) {
        this.activeOper = tool
        this.dragItem = null
      },

      // 工具栏单击
      toolClick(tool) {
        this.$emit('toolClick', tool)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/flow/flow";
</style>
