<template>
  <div class="sbox-view" @mousemove="handleDrag" @mouseup="handleDragEnd">
    <div class="boxs">
      <div
        v-for="box in showBoxs"
        :key="box.id"
        :class="['box', {active:cBox===box.id}]"
        :style="boxStyle(box)"
        @click="boxClick(box)">
        <div class="box-inner" @contextmenu.prevent="menuShow(box.id, $event)">
          <template v-if="cBox===box.id">
            <a-button
              type="dashed"
              icon="plus"
              class="box-add"
              @click="boxSelect">添加
            </a-button>
            <a-button class="box-resize" icon="arrows-alt"></a-button>
          </template>
          <component v-else-if="box.component" :is="box.component.name"/>
        </div>
      </div>
    </div>
    <div class="lines">
      <div
        v-for="line in showLines"
        :key="line.id"
        :class="['line', {active:cLine===line.id}, 'line-'+line.way]"
        :style="lineStyle(line)"
        @click="lineClick(line)"
        @mousedown.prevent="lineDragStart(line.id)"></div>
      <div class="line-box" :style="lineBoxStyle" v-show="cLine"></div>
    </div>
  </div>
</template>

<script>
  import {v4 as uuid} from 'uuid'

  export default {
    name: 'SBox',

    data() {
      return {
        cBox: null, // 当前选中区域
        dragLine: false,
        cLine: null // 当前选中分割线
      }
    },

    props: {
      padding: {
        type: Number,
        default: 10
      },

      minW: {
        type: Number,
        default: 5
      },

      minH: {
        type: Number,
        default: 50
      },

      boxs: {
        type: Array,
        default() {
          return []
        }
      }
    },

    computed: {
      // 分割线所属区域的样式
      lineBoxStyle() {
        if (this.cLine) {
          const box = this.boxs.find(b => b.line && b.line.id === this.cLine)
          return {
            top: (box.y + this.padding / 2) + 'px',
            left: `calc(${box.x}% + ${this.padding / 2}px)`,
            width: `calc(${box.w}% - ${this.padding}px)`,
            height: (box.h - this.padding) + 'px'
          }
        } else {
          return null
        }
      },

      boxMap() {
        const res = {}
        this.boxs.forEach(o => {
          res[o.id] = o
        })
        return res
      },

      showBoxs() {
        return this.boxs.filter(o => o.line === undefined)
      },

      showLines() {
        return this.boxs.filter(o => o.line).map(b => b.line)
      },

      // 根节点
      rootBox() {
        return this.boxs.find(d => d.parent === undefined)
      }
    },

    watch: {
      boxs() {
        this.$emit('update')
      }
    },

    methods: {
      // 清空根节点
      clearRoot() {
        if (this.rootBox) {
          delete this.rootBox.line
          this.boxs.splice(0, this.boxs.length, this.rootBox)
          this.cBox = this.rootBox.id
          this.cLine = null
        }
      },

      // box选择小部件
      boxSelect() {
        this.$emit('boxSelect')
      },

      // 绑定小部件
      addWidget(name, params) {
        const box = this.boxMap[this.cBox]
        box.component = {name: name, params: params}
        this.cBox = null
        // 触发监听
        this.$set(this.boxs, this.boxs.findIndex(d => d.id === this.cBox), box)
      },

      // 右键菜单
      menuShow(id, e) {
        this.cBox = id
        this.$emit('boxRightClick', e)
      },

      boxStyle(box) {
        return {
          top: box.y + 'px',
          left: box.x + '%',
          width: box.w + '%',
          height: box.h + 'px',
          padding: this.padding / 2 + 'px'
        }
      },

      lineStyle(line) {
        const box = this.boxMap[line.id]
        if (line.way === 'v') {
          return {
            top: box.y + 'px',
            left: line.x + '%',
            width: this.padding + 'px',
            height: (box.h - this.padding) + 'px',
            margin: `${this.padding / 2}px 0 0 -${this.padding / 2}px`
          }
        } else if (line.way === 'h') {
          return {
            top: line.y + 'px',
            left: box.x + '%',
            width: `calc(${box.w}% - ${this.padding}px)`,
            height: this.padding + 'px',
            margin: `-${this.padding / 2}px 0 0 ${this.padding / 2}px`
          }
        } else {
          return null
        }

      },

      boxClick(box) {
        this.cLine = null
        this.cBox = box.id
        this.$emit('boxClick', box)
      },

      lineClick(line) {
        this.$emit('lineClick', line)
      },

      // 改变区域（递归），保持分割线的百分比不变
      resizeBox(box) {
        if (box.line) {
          const line = box.line
          if (line.way === 'v') {
            const vv = box.w * line.pc / 100
            line.x = box.x + vv
            const cc = this.boxs.filter(b => b.parent === box.id).sort((a, b) => a.x - b.x)
            cc[0].x = box.x
            cc[0].y = box.y
            cc[0].w = vv
            cc[0].h = box.h
            this.resizeBox(cc[0])
            cc[1].x = box.x + vv
            cc[1].y = box.y
            cc[1].w = box.w - vv
            cc[1].h = box.h
            this.resizeBox(cc[1])
          } else if (line.way === 'h') {
            const vv = box.h * line.pc / 100
            line.y = box.y + vv
            const cc = this.boxs.filter(b => b.parent === box.id).sort((a, b) => a.y - b.y)
            cc[0].x = box.x
            cc[0].y = box.y
            cc[0].w = box.w
            cc[0].h = vv
            this.resizeBox(cc[0])
            cc[1].x = box.x
            cc[1].y = box.y + vv
            cc[1].w = box.w
            cc[1].h = box.h - vv
            this.resizeBox(cc[1])
          }
        }
      },

      // 分割线开始拖拽
      lineDragStart(id) {
        this.cBox = null
        this.cLine = id
        this.dragLine = true
        this.$emit('lineDown', id)
      },

      // 主面板拖拽事件，须谨慎使用
      handleDrag(e) {
        if (this.dragLine) { // 拖拽分割线
          const rect = this.$el.getBoundingClientRect(),
            box = this.boxMap[this.cLine],
            line = box.line,
            ex = (e.clientX - rect.left) / rect.width * 100,
            ey = e.clientY - rect.top

          if (line.way === 'v') {
            if (ex < box.x + this.minW) {
              line.pc = this.minW / box.w * 100
            } else if (ex > box.x + box.w - this.minW) {
              line.pc = (box.w - this.minW) / box.w * 100
            } else {
              line.pc = (ex - box.x) / box.w * 100
            }
            this.$emit('lineMove', line.pc)
          } else if (line.way === 'h') {
            if (ey < box.y + this.minH) {
              line.pc = this.minH / box.h * 100
            } else if (ey > box.y + box.h - this.minH) {
              line.pc = (box.h - this.minH) / box.h * 100
            } else {
              line.pc = (ey - box.y) / box.h * 100
            }
            this.$emit('lineMove', line.pc)
          }
          this.resizeBox(box)
          // 防抖处理
          this.bBoxTimeout && clearTimeout(this.bBoxTimeout)
          this.bBoxTimeout = setTimeout(() => {
            // 触发watch
            this.boxs.splice(0, this.boxs.length, ...this.boxs)
          }, 300)
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        this.dragLine = false
      },

      // 对当前节点进行水平分割
      splitBoxH() {
        const pp = this.boxMap[this.cBox], hh = pp.h / 2
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y,
          w: pp.w,
          h: hh,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y + hh,
          w: pp.w,
          h: pp.h - hh,
          parent: pp.id
        }
        this.boxs.push(box1, box2)

        pp.line = {
          id: pp.id,
          y: pp.y + hh,
          way: 'h',
          pc: 50
        }

        this.cBox = null
        this.cLine = pp.id
      },

      // 对当前节点进行垂直分割
      splitBoxV() {
        const pp = this.boxMap[this.cBox], vv = pp.w / 2

        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y,
          w: vv,
          h: pp.h,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x + vv,
          y: pp.y,
          w: pp.w - vv,
          h: pp.h,
          parent: pp.id
        }
        this.boxs.push(box1, box2)

        pp.line = {
          id: pp.id,
          x: pp.x + vv,
          way: 'v',
          pc: 50
        }

        this.cBox = null
        this.cLine = pp.id
      },

      // 在底部添加一行区域
      addRow() {
        const oldBox = this.rootBox,
          newId = uuid().replace(/-/g, '')

        const line = {
          id: newId,
          x: oldBox.x,
          y: oldBox.y + oldBox.h,
          w: oldBox.w,
          h: this.padding,
          way: 'h',
          value: oldBox.h + this.padding / 2
        }

        const newBox = {
          id: newId,
          x: oldBox.x,
          y: oldBox.y,
          w: oldBox.w,
          h: oldBox.h + 100 + this.padding,
        }

        line.pc = line.value / newBox.h * 100
        newBox.line = line

        const addBox = {
          id: uuid().replace(/-/g, ''),
          x: oldBox.x,
          y: oldBox.y + oldBox.h + this.padding,
          w: oldBox.w,
          h: 100,
          parent: newBox.id
        }

        oldBox.parent = newBox.id
        this.boxs.push(newBox, addBox)
        this.cBox = addBox.id
      },

      // 删除当前节点
      deleteBox() {
        const box = this.boxMap[this.cBox]

        if (box.id === this.rootBox.id) {
          console.log('不能删除根节点')
        } else {
          const parent = this.boxMap[box.parent],
            next = this.boxs.find(b => b.parent === box.parent && b.id !== box.id)

          if (parent.id === this.rootBox.id) {
            delete next.parent
          } else {
            next.parent = parent.parent
          }

          next.x = parent.x
          next.y = parent.y
          next.w = parent.w
          next.h = parent.h

          this.resizeBox(next)
          this.boxs.splice(this.boxs.findIndex(b => b.id === box.id), 1)
          this.boxs.splice(this.boxs.findIndex(b => b.id === parent.id), 1)
          this.cBox = next.id
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sbox-view {
    width: 100%;
    height: 100%;
    position: relative;

    .line {
      position: absolute;

      &.active {
        background: #ffbbba;
      }
    }

    .line-box {
      position: absolute;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 0 5px 5px #ffbbba;
      pointer-events: none;
    }

    .line-h {
      cursor: ns-resize;
    }

    .line-v {
      cursor: ew-resize;
    }

    .box {
      position: absolute;
    }

    .box-inner {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 5px 5px rgba(240, 240, 240, 1);
      padding: 10px;
    }

    .box-add {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }

    .box-resize {
      position: absolute;
      right: 5px;
      bottom: 5px;
      transform: rotate(90deg);
    }
  }
</style>
