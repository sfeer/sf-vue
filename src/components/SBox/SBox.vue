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
          <a-button
              v-if="cBox===box.id"
              type="dashed"
              icon="plus"
              class="box-add"
              @click="boxSelect">添加
          </a-button>
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
    data() {
      return {
        root: null,
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
        default: 100
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
            left: (box.x + this.padding / 2) + 'px',
            width: (box.w - this.padding) + 'px',
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
      }
    },

    watch: {
      boxs(v, o) {
        // 初始化的时候
        if (v.length > 0 && o.length === 0) {
          this.initBoxs(v)
        }
        this.$emit('updated')
      }
    },

    methods: {
      // box选择小部件
      boxSelect() {
        this.$emit('boxSelect')
      },

      // 绑定小部件
      addWidget(name, params) {
        const box = this.boxMap[this.cBox]
        box.component = {name: name, params: params}
        this.cBox = null
      },

      // 右键菜单
      menuShow(id, e) {
        this.cBox = id
        this.$emit('boxRightClick', e)
      },

      // 初始化数据
      initBoxs() {
        if (this.boxs && this.boxs.length > 0) {
          this.root = this.boxs.find(d => d.parent === undefined).id
          this.resizeRoot(this.$el.clientWidth, this.$el.clientHeight)
          this.cBox = this.boxs.find(d => d.line === undefined).id
        }
      },

      // 改变根节点大小
      resizeRoot(w, h) {
        if (this.root) {
          const root = this.boxMap[this.root]
          root.w = w
          root.h = h
          this.resizeBox(root)
          this.$emit('updated')
        }
      },

      boxStyle(box) {
        return {
          top: box.y + 'px',
          left: box.x + 'px',
          width: box.w + 'px',
          height: box.h + 'px',
          padding: this.padding / 2 + 'px'
        }
      },

      lineStyle(line) {
        return {
          top: line.y + 'px',
          left: line.x + 'px',
          width: line.w + 'px',
          height: line.h + 'px'
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

      // 改变区域（递归）
      resizeBox(box) {
        if (box.line) {
          const p = this.padding / 2, line = box.line
          if (line.way === 'v') {
            const vv = Math.round(box.w * line.pc / 100)
            line.value = vv
            line.x = box.x + vv - p
            line.y = box.y + this.padding / 2
            line.h = box.h - this.padding
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
            const vv = Math.round(box.h * line.pc / 100)
            line.value = vv
            line.y = box.y + vv - p
            line.w = box.w - this.padding
            line.x = box.x + this.padding / 2
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
            ex = e.pageX - rect.left - box.x,
            ey = e.pageY - rect.top - box.y

          if (line.way === 'v') {
            if (this.minW > ex) {
              line.value = this.minW
            } else if (this.minW > box.w - ex) {
              line.value = box.w - this.minW
            } else {
              line.value = ex
            }
            line.x = box.x + line.value - this.padding / 2
            line.pc = line.value / box.w * 100
            this.$emit('lineMove', line.pc)
          } else if (line.way === 'h') {
            if (this.minH > ey) {
              line.value = this.minH
            } else if (this.minH > box.h - ey) {
              line.value = box.h - this.minH
            } else {
              line.value = ey
            }
            line.y = box.y + line.value - this.padding / 2
            line.pc = line.value / box.h * 100
            this.$emit('lineMove', line.pc)
          }

          this.resizeBox(box)
          this.$emit('updated')
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        this.dragLine = false
      },

      // 对当前节点进行水平分割
      splitBoxH() {
        const pp = this.boxMap[this.cBox],
          hh = Math.round(pp.h / 2)
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
          x: pp.x + this.padding / 2,
          y: pp.y + hh - this.padding / 2,
          w: pp.w - this.padding,
          h: this.padding,
          way: 'h',
          pc: 50,
          value: hh
        }

        this.cBox = null
        this.cLine = pp.id
      },

      // 对当前节点进行垂直分割
      splitBoxV() {
        const pp = this.boxMap[this.cBox],
          vv = Math.round(pp.w / 2)
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
          x: pp.x + vv - this.padding / 2,
          y: pp.y + this.padding / 2,
          w: this.padding,
          h: pp.h - this.padding,
          way: 'v',
          pc: 50,
          value: vv
        }

        this.cBox = null
        this.cLine = pp.id
      },

      // 在底部添加一行区域
      addRow() {
        const oldBox = this.boxMap[this.root],
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

        line.pc = Math.round(line.value / newBox.h * 100)
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
        this.root = newBox.id
        this.boxs.push(newBox, addBox)
        this.cBox = addBox.id
      },

      // 删除当前节点
      deleteBox() {
        const box = this.boxMap[this.cBox]

        if (box.id === this.root) {
          console.log('不能删除根节点')
        } else {
          const parent = this.boxMap[box.parent],
            next = this.boxs.find(b => b.parent === box.parent && b.id !== box.id)

          if (parent.id === this.root) {
            this.root = next.id
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
  }
</style>
