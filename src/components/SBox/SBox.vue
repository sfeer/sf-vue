<template>
  <div class="sbox-view" @mousemove="handleDrag" @mouseup="handleDragEnd">
    <div class="boxs">
      <div
          v-for="box in showBoxs"
          :key="box.id"
          :class="['box', {active:cBox===box.id}]"
          :style="boxStyle(box)"
          @click="boxClick(box)">
        <a-button type="dashed" icon="plus" class="box-add" v-if="cBox===box.id">添加</a-button>
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
        cLine: null, // 当前选中分割线
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

    mounted() {
      if (this.boxs.length === 0) {
        this.root = uuid().replace(/-/g, '')
        this.boxs.push({
          id: this.root,
          x: 0,
          y: 0,
          w: this.$el.clientWidth,
          h: this.$el.clientHeight
        })
        this.cBox = this.root

      } else {
        // TODO 初始化有值时需要找到root并设置当前选择的box
      }
    },

    methods: {
      // 改变根节点大小
      resizeRoot(w, h) {
        const root = this.boxMap[this.root]
        root.w = w
        root.h = h
        this.resizeBox(root)
      },

      boxStyle(box) {
        return {
          top: box.y + 'px',
          left: box.x + 'px',
          width: box.w + 'px',
          height: box.h + 'px'
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
            line.y = box.y
            line.h = box.h
            const cc = this.boxs.filter(b => b.parent === box.id).sort((a, b) => a.x - b.x)
            cc[0].x = box.x
            cc[0].y = box.y
            cc[0].w = vv - p
            cc[0].h = box.h
            this.resizeBox(cc[0])
            cc[1].x = box.x + vv + p
            cc[1].y = box.y
            cc[1].w = box.w - vv - p
            cc[1].h = box.h
            this.resizeBox(cc[1])
          } else if (line.way === 'h') {
            const vv = Math.round(box.h * line.pc / 100)
            line.value = vv
            line.y = box.y + vv - p
            line.w = box.w
            line.x = box.x
            const cc = this.boxs.filter(b => b.parent === box.id).sort((a, b) => a.y - b.y)
            cc[0].x = box.x
            cc[0].y = box.y
            cc[0].w = box.w
            cc[0].h = vv - p
            this.resizeBox(cc[0])
            cc[1].x = box.x
            cc[1].y = box.y + vv + p
            cc[1].w = box.w
            cc[1].h = box.h - vv - p
            this.resizeBox(cc[1])
          }
        }
      },

      // 分割线开始拖拽
      lineDragStart(id) {
        this.cLine = id
        this.dragLine = true
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
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        this.dragLine = false
      },

      // 调整当前节点的分割值
      splitBox(v) {
        const box = this.boxMap[this.cLine], line = box.line
        if (line.way === 'v') {
          line.pc = v
          line.value = Math.round(box.w * v / 100)
          line.x = box.x + line.value - this.padding / 2
        } else if (line.way === 'h') {
          line.pc = v
          line.value = Math.round(box.h * v / 100)
          line.y = box.y + line.value - this.padding / 2
        }
        this.resizeBox(box)
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
          h: hh - this.padding / 2,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y + hh + this.padding / 2,
          w: pp.w,
          h: pp.h - hh - this.padding / 2,
          parent: pp.id
        }
        this.boxs.push(box1, box2)

        pp.line = {
          id: pp.id,
          x: pp.x,
          y: pp.y + hh - this.padding / 2,
          w: pp.w,
          h: this.padding,
          way: 'h',
          pc: 50,
          value: hh
        }
        this.cBox = box1.id
      },

      // 对当前节点进行垂直分割
      splitBoxV() {
        const pp = this.boxMap[this.cBox],
          vv = Math.round(pp.w / 2)
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y,
          w: vv - this.padding / 2,
          h: pp.h,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x + vv + this.padding / 2,
          y: pp.y,
          w: pp.w - vv - this.padding / 2,
          h: pp.h,
          parent: pp.id
        }
        this.boxs.push(box1, box2)

        pp.line = {
          id: pp.id,
          x: pp.x + vv - this.padding / 2,
          y: pp.y,
          w: this.padding,
          h: pp.h,
          way: 'v',
          pc: 50,
          value: vv
        }
        this.cBox = box1.id
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

    .line-h {
      cursor: ns-resize;
    }

    .line-v {
      cursor: ew-resize;
    }

    .box {
      position: absolute;
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
