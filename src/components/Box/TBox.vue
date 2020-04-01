<!--
    <div>在SBox的基础上</div>
    <div>#1 去除分割线调节</div>
    <div>#2 在每个showBoxs的右下角显示可拖拽的图标</div>
    <div>#3 在父节点有空闲空间时可以变大、也可以变小（不能小于最小高宽）</div>
    <div>#4 空闲的高宽，可以在递归后保存在每个box属性中（freeW，freeH）</div>
-->

<template>
  <div class="tbox-view" @mousemove="handleDrag" @mouseup="handleDragEnd">
    <div class="boxs">
      <div
        v-for="box in showBoxs"
        :key="box.id"
        :class="['box', {active:cBox===box.id}]"
        :style="boxStyle(box)"
        @click="boxClick(box)">
        <div class="box-inner" @contextmenu.prevent="menuShow(box.id, $event)">
          <template v-if="cBox===box.id">
            <a-button type="dashed" icon="plus" class="box-add" @click="boxSelect">添加</a-button>
            <div class="box-line col" @mousedown.prevent="lineDragStart('col')"></div>
            <div class="box-line row" @mousedown.prevent="lineDragStart('row')"></div>
          </template>
          <component v-else-if="box.component" :is="box.component.name"/>
        </div>
      </div>
    </div>
    <resize-observer @notify="handleResize"/>
  </div>
</template>

<script>
  import {v4 as uuid} from 'uuid'

  export default {
    name: 'SBox',

    data() {
      return {
        cBox: null, // 当前选中区域
        lineType: null, // 调整线类型 col,row
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
        return this.boxs.filter(o => o.mode === undefined)
      },

      // 根节点
      rootBox() {
        return this.boxs.find(d => d.parent === undefined)
      }
    },

    watch: {
      boxs() {
        if (this.rootBox.w !== this.$el.clientWidth) {
          // 根节点resize
          this.autoBox(this.rootBox, this.$el.clientWidth)
        }
        this.$emit('update')
      }
    },

    methods: {
      // 调整线开始拖拽
      lineDragStart(type) {
        this.lineType = type
      },

      // 清空根节点
      clearRoot() {
        if (this.rootBox) {
          delete this.rootBox.line
          this.boxs.splice(0, this.boxs.length, this.rootBox)
          this.cBox = this.rootBox.id
        }
      },

      handleResize() {
        this.rootBox.w = this.$el.clientWidth
        this.resizeBox(this.rootBox)
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
          left: box.x + 'px',
          width: box.w + 'px',
          height: box.h + 'px',
          padding: this.padding / 2 + 'px'
        }
      },

      boxClick(box) {
        this.cBox = box.id
        this.$emit('boxClick', box)
      },

      // 自动改变区域（递归）
      autoBox(box, width) {
        if (box.mode === 'row') {
          const cc = this.boxs.filter(b => b.parent === box.id).forEach(bb => {
            this.autoBox(bb, width)
          })
        } else if (box.mode === 'col') {
          const cc = this.boxs.filter(b => b.parent === box.id).sort((a, b) => a.x - b.x)
          const vv = Math.round(cc[0].w * width / box.w)
          cc[1].x = box.x + vv
          this.autoBox(cc[0], vv)
          this.autoBox(cc[1], width - vv)
        }
        box.w = width
      },

      // 调整区域（递归）
      resizeBoxW(box, width) {
        if (box.w !== width) {
          const ww = box.w - width
          if (box.parent) {
            const parent = this.boxMap[box.parent]
            if (parent.mode === 'col') {
              this.resizeBoxW(parent, parent.w - ww)
              // 右侧区域调整横坐标
              this.boxs.filter(d => d.parent === box.parent && d.x > box.x).forEach(b => {
                b.x = b.x - ww
              })
            } else if (parent.mode === 'row') {
              const max = Math.max(width, ...this.boxs.filter(d => d.parent === box.parent && d.y > box.y).map(x => x.w))
              this.resizeBoxW(parent, max)
            }
          }
          box.w = width
        }
      },

      // 调整区域（递归）
      resizeBoxH(box, height) {
        const hh = box.h - height
        if (box.parent) {
          const parent = this.boxMap[box.parent]
          if (parent.mode === 'row') {
            this.resizeBoxH(parent, parent.h - hh)
            this.boxs.filter(d => d.parent === box.parent && d.y > box.y).forEach(b => {
              // this.freeBoxH(b, fh)
              b.y = box.y + height
            })
          }
        }
        box.h = height
      },

      // TODO 暂时没用上
      freeBoxW(box, fw) {
        box.fw += fw
        this.boxs.filter(d => d.parent === box.id).forEach(b => {
          this.freeBoxW(b, fw)
        })
      },

      // 主面板拖拽事件，须谨慎使用
      handleDrag(e) {
        if (this.lineType) {
          const rect = this.$el.getBoundingClientRect(),
            box = this.boxMap[this.cBox],
            ex = e.clientX - rect.left - box.x,
            ey = e.clientY - rect.top - box.y

          if (this.lineType === 'col') {
            if (ex < this.minW) {
              this.resizeBoxW(box, this.minW)
            } else {
              this.resizeBoxW(box, ex)
            }
          } else if (this.lineType === 'row') {
            if (ey < this.minH) {
              this.resizeBoxH(box, this.minH)
            } else {
              this.resizeBoxH(box, ey)
            }
          }
        }
      },

      // 主面板拖拽结束事件
      handleDragEnd() {
        this.lineType = null
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
        pp.mode = 'row'
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
        pp.mode = 'col'
        this.cBox = box1.id
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
  .tbox-view {
    width: 100%;
    height: 100%;
    background: #f3f3f3;
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
      box-shadow: 0 0 5px 5px #ddd;
      padding: 10px;
    }

    .box-add {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }

    .box-line {
      position: absolute;

      &:after {
        background-color: #f4ad9d;
        position: absolute;
      }

      &.col {
        width: 20px;
        right: -5px;
        top: 15px;
        bottom: 15px;
        cursor: ew-resize;

        &:after {
          content: '';
          width: 2px;
          right: 8px;
          top: 0;
          bottom: 0;
        }
      }

      &.row {
        height: 20px;
        left: 15px;
        right: 15px;
        bottom: -5px;
        cursor: ns-resize;

        &:after {
          content: '';
          height: 2px;
          left: 0;
          right: 0;
          bottom: 8px;
        }
      }
    }
  }
</style>
