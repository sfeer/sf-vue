<template>
  <div class="sbox-view" @mousemove="handleDrag" @mouseup="handleDragEnd">
    <div class="boxs">
      <div
          v-for="box in showBoxs"
          :key="box.id"
          :class="['box', {active:cBox===box.id}]"
          :style="boxStyle(box)"
          @click="boxClick(box.id)">
        <a-button type="dashed" icon="plus" class="box-add" v-if="cBox===box.id">添加</a-button>
      </div>
    </div>
    <div class="lines">
      <div
          v-for="line in showLines"
          :key="line.id"
          :class="['line', {active:cLine===line.id}, 'line-'+line.way]"
          :style="lineStyle(line)"
          @mousedown.prevent="lineDragStart(line.id)"></div>
    </div>
  </div>
</template>

<script>
  import uuid from 'uuid'

  export default {
    data() {
      return {
        root: null,
        cBox: null, // 当前选中区域
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
        return this.boxs.filter(o => o.leaf)
      },

      showLines() {
        return this.boxs.filter(o => (o.hh || o.vv) && !o.leaf).map(b => {
          if (b.hh) { // 水平分割
            return {
              id: b.id,
              x: b.x,
              y: b.y + (b.h - this.padding) * b.hh / 100,
              w: b.w,
              h: this.padding,
              way: 'h'
            }
          } else if (b.vv) {
            return {
              id: b.id,
              x: b.x + (b.w - this.padding) * b.vv / 100,
              y: b.y,
              w: this.padding,
              h: b.h,
              way: 'v'
            }
          }
        })
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
          h: this.$el.clientHeight,
          leaf: true
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
        this._resizeBox(root, {x: root.x, y: root.y, w: w, h: h})
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

      boxClick(id) {
        this.cBox = id
      },

      // 改变区域（递归）
      _resizeBox(box, val) {
        if (box.leaf === false) {
          const p = this.padding / 2
          if (box.vv) {
            const c1 = this.boxs.find(b => b.parent === box.id && b.x === box.x),
              c2 = this.boxs.find(b => b.parent === box.id && b.x !== box.x)
            this._resizeBox(c1, {
              x: val.x,
              y: val.y,
              w: val.w * box.vv / 100 - p,
              h: val.h
            })
            this._resizeBox(c2, {
              x: val.x + val.w * box.vv / 100 + p,
              y: val.y,
              w: val.w * (100 - box.vv) / 100 - p,
              h: val.h
            })
          } else if (box.hh) {
            const c1 = this.boxs.find(b => b.parent === box.id && b.y === box.y),
              c2 = this.boxs.find(b => b.parent === box.id && b.y !== box.y)
            this._resizeBox(c1, {
              x: val.x,
              y: val.y,
              w: val.w,
              h: val.h * box.hh / 100 - p
            })
            this._resizeBox(c2, {
              x: val.x,
              y: val.y + val.h * box.hh / 100 + p,
              w: val.w,
              h: val.h * (100 - box.hh) / 100 - p
            })
          }
        }

        box.x = val.x
        box.y = val.y
        box.w = val.w
        box.h = val.h
      },

      // 分割线开始拖拽
      lineDragStart(line) {
        this.cLine = line
      },

      // 主面板拖拽事件，须谨慎使用
      handleDrag(e) {
        if (this.cLine) { // 拖拽分割线
          const rect = this.$el.getBoundingClientRect(),
            ex = e.pageX - rect.left, ey = e.pageY - rect.top,
            box = this.boxMap[this.cLine],
            line = this.showLines.find(l => l.id === this.cLine)

          if (line.way === 'v') {
            const xx = (ex - box.x) > this.minW ? ((box.x + box.w - ex) > this.minW ? (ex - box.x) : box.w - this.minW) : this.minW
            box.vv = xx / box.w * 100
            line.x = box.x + xx - this.padding / 2
          } else if (line.way === 'h') {
            const yy = (ey - box.y) > this.minH ? ((box.y + box.h - ey) > this.minH ? (ey - box.y) : box.h - this.minH) : this.minH
            box.hh = yy / box.h * 100
            line.y = box.y + yy - this.padding / 2
          }

          this._resizeBox(box, {
            x: box.x,
            y: box.y,
            w: box.w,
            h: box.h
          })
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        if (this.cLine) { // 拖拽连线
          this.cLine = null
        }
      },

      // 对当前节点进行水平分割
      splitBoxH() {
        const pp = this.boxMap[this.cBox]
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y,
          w: pp.w,
          h: (pp.h - this.padding) / 2,
          parent: pp.id,
          leaf: true
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y + (pp.h + this.padding) / 2,
          w: pp.w,
          h: (pp.h - this.padding) / 2,
          parent: pp.id,
          leaf: true
        }
        this.boxs.push(box1, box2)

        pp.hh = 50
        pp.leaf = false
        this.cBox = box1.id
      },

      // 对当前节点进行垂直分割
      splitBoxV() {
        const pp = this.boxMap[this.cBox]
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x,
          y: pp.y,
          w: (pp.w - this.padding) / 2,
          h: pp.h,
          parent: pp.id,
          leaf: true
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: pp.x + (pp.w + this.padding) / 2,
          y: pp.y,
          w: (pp.w - this.padding) / 2,
          h: pp.h,
          parent: pp.id,
          leaf: true
        }
        this.boxs.push(box1, box2)

        pp.vv = 50
        pp.leaf = false
        this.cBox = box1.id
      },

      // 在底部添加一行区域
      addRow() {
        const oldBox = this.boxMap[this.root]

        const newBox = {
          id: uuid().replace(/-/g, ''),
          x: oldBox.x,
          y: oldBox.y,
          w: oldBox.w,
          h: oldBox.h + 100 + this.padding,
          hh: (oldBox.h + this.padding / 2) * 100 / (oldBox.h + 100 + this.padding),
          leaf: false
        }

        const addBox = {
          id: uuid().replace(/-/g, ''),
          x: oldBox.x,
          y: oldBox.y + oldBox.h + this.padding,
          w: oldBox.w,
          h: 100,
          parent: newBox.id,
          leaf: true
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

          this._resizeBox(next, {x: parent.x, y: parent.y, w: parent.w, h: parent.h})
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
