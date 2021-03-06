<template>
  <div
    class="tbox-view"
    :style="{height:mainHeight}"
    @mousemove="handleDrag"
    @mouseup="handleDragEnd"
    @mouseleave="handleLeave">
    <div class="boxs">
      <div
        v-for="box in showBoxs"
        :key="box.id"
        :class="['box', {active:cBox===box.id}]"
        :style="boxStyle(box)"
        @click="boxClick(box)"
        @contextmenu.prevent="menuShow(box.id, $event)">
        <a-button
          v-if="cBox===box.id"
          type="dashed"
          icon="plus"
          class="box-add"
          @click="boxSelect">添加
        </a-button>
        <component v-else-if="box.component" :is="box.component.name"/>
      </div>
      <div class="box-line col" :style="boxLineColStyle" @mousedown.prevent="lineDragStart('col')"></div>
      <div class="box-line row" :style="boxLineRowStyle" @mousedown.prevent="lineDragStart('row')"></div>
    </div>
    <resize-observer @notify="handleResize"/>
  </div>
</template>

<script>
  import {v4 as uuid} from 'uuid'

  export default {
    name: 'TBox',

    data() {
      return {
        cBox: null, // 当前选中区域
        lineType: null, // 调整线类型 col,row
      }
    },

    props: {
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
      },

      // 主面板高度
      mainHeight() {
        return this.rootBox ? ((this.rootBox.h + 100) + 'px') : null
      },

      // 右侧调节栏样式
      boxLineColStyle() {
        if (this.cBox) {
          const box = this.boxMap[this.cBox]
          if (box.lw) {
            return null
          } else {
            return {
              left: (box.x + box.w - 10) + 'px',
              top: (box.y + 10) + 'px',
              height: (box.h - 20) + 'px'
            }
          }
        } else {
          return null
        }
      },

      // 下侧调节栏样式
      boxLineRowStyle() {
        if (this.cBox) {
          const box = this.boxMap[this.cBox]
          if (box.lw) {
            return {
              top: (box.y + box.h - 10) + 'px',
              left: (box.lx + 10) + 'px',
              width: (box.lw - 20) + 'px'
            }
          } else {
            return {
              top: (box.y + box.h - 10) + 'px',
              left: (box.x + 10) + 'px',
              width: (box.w - 20) + 'px'
            }
          }
        } else {
          return null
        }
      }
    },

    watch: {
      boxs() {
        this.$emit('update')
      }
    },

    methods: {
      // 锁定宽度
      lockWidth(width) {
        if (this.cBox) {
          const box = this.boxMap[this.cBox]
          if (width > box.w) {
            this.$message.error('锁定宽度不能大于原宽度')
          } else {
            box.lx = box.x + (box.w - width) / 2
            box.lw = width
            this.boxs.splice(this.boxs.findIndex(b => b.id === box.id), box)
          }
        } else {
          this.$message.error('请选择区域操作！')
        }
      },

      // 新增一行（递归）
      autoAddRow(box) {
        if (box.parent) {
          const parent = this.boxMap[box.parent]
          if (parent.mode === 'col') {
            this.autoAddRow(parent)
          } else if (parent.mode === 'row') {
            // 调整父节点
            this.resizeBoxH(parent, parent.h + 100)
            // 调整后续节点
            this.boxs.filter(d => d.parent === box.parent && d.y > box.y).forEach(dd => {
              this.autoYBox(dd, 100)
            })
            this.boxs.splice(this.boxs.findIndex(b => b.id === box.id) + 1, 0, {
              id: uuid().replace(/-/g, ''),
              x: box.x,
              y: box.y + box.h,
              w: parent.w,
              h: 100,
              parent: parent.id
            })
          }
        } else {
          const newRoot = {
            id: uuid().replace(/-/g, ''),
            x: box.x,
            y: box.y,
            w: box.w,
            h: box.h + 100,
            mode: 'row'
          }
          this.boxs.splice(0, 0, {
            id: uuid().replace(/-/g, ''),
            x: box.x,
            y: box.y + box.h,
            w: box.w,
            h: 100,
            parent: newRoot.id
          }, newRoot)
          box.parent = newRoot.id
        }
      },

      // 新增一行
      addRow() {
        if (this.cBox) {
          this.autoAddRow(this.boxMap[this.cBox])
        } else {
          this.$message.error('请选择区域操作！')
        }
      },

      // 调整线开始拖拽
      lineDragStart(type) {
        this.lineType = type
      },

      // 清空根节点
      clearRoot() {
        if (this.rootBox) {
          this.boxs.splice(0, this.boxs.length, {
            id: this.rootBox.id,
            x: 0,
            y: 0,
            w: this.$el.clientWidth,
            h: this.rootBox.h
          })
          this.cBox = this.rootBox.id
        }
      },

      handleResize() {
        if (this.rootWidth !== this.$el.clientWidth) {
          // 组件宽度发生变化
          this.rootWidth = this.$el.clientWidth
          this.autoWidthBox(this.rootBox, this.$el.clientWidth)
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
        if (box.lw) {
          // 锁定宽度
          return {
            top: box.y + 'px',
            left: box.lx + 'px',
            width: box.lw + 'px',
            height: box.h + 'px'
          }
        } else {
          return {
            top: box.y + 'px',
            left: box.x + 'px',
            width: box.w + 'px',
            height: box.h + 'px'
          }
        }
      },

      boxClick(box) {
        this.cBox = box.id
        this.$emit('boxClick', box)
      },

      // 自动改变区域宽度（递归）
      autoWidthBox(box, width) {
        console.log(111)
        if (width !== box.w) {
          const childs = this.boxs.filter(b => b.parent === box.id)
          if (box.lw) {
            // 锁定宽度
            if (width < box.lw) {
              width = box.lw
            }
            const add = box.x + (width - box.lw) / 2 - box.lx
            childs.forEach(b => {
              this.autoXBox(b, add)
            })
            box.lx += add
          } else {
            // 等比例缩放
            const vv = width / box.w
            if (box.mode === 'row') {
              childs.forEach(bb => {
                bb.x = box.x
                this.autoWidthBox(bb, bb.w * vv)
              })
            } else if (box.mode === 'col') {
              childs.forEach(bb => {
                bb.x = bb.x * vv
                this.autoWidthBox(bb, bb.w * vv)
              })
            }
          }

          box.w = width
        }
      },

      // 自动改变区域x坐标（递归）
      autoXBox(box, add) {
        this.boxs.filter(b => b.parent === box.id).forEach(bb => {
          this.autoXBox(bb, add)
        })
        box.x += add
      },

      // 自动改变区域y坐标（递归）
      autoYBox(box, add) {
        this.boxs.filter(b => b.parent === box.id).forEach(bb => {
          this.autoYBox(bb, add)
        })
        box.y += add
      },

      // 调整区域（递归）
      resizeBoxW(box, width) {
        if (width < this.minW) {
          width = this.minW
        }

        if (box.w !== width) {
          if (box.parent) {
            const parent = this.boxMap[box.parent],
              others = this.boxs.filter(d => d.parent === box.parent && d.id !== box.id),
              ws = others.map(d => d.w)
            if (parent.mode === 'col') {
              let add = width - box.w // 期望变动距离

              if (parent.lw) {
                // 锁定宽度
                const sum = ws.reduce((a, b) => a + b)
                if (width + sum > parent.lw) {
                  // 实际变动距离
                  add = parent.lw - sum - box.w
                }
              } else {
                const ow = parent.w
                this.resizeBoxW(parent, parent.w + add)

                if (add > parent.w - ow) {
                  // 实际变动距离
                  add = parent.w - ow
                }
              }

              if (add !== 0) {
                // 右侧区域调整横坐标
                others.filter(d => d.x > box.x).forEach(b => {
                  this.autoXBox(b, add)
                })
                box.w += add
              }
            } else if (parent.mode === 'row') {
              if (parent.lw) {
                if (width < parent.lw) {
                  box.w = width
                } else {
                  box.w = parent.lw
                }
              } else {
                const max = Math.max(width, ...ws)
                this.resizeBoxW(parent, max)

                if (width < parent.w) {
                  box.w = width
                } else {
                  box.w = parent.w
                }
              }
            }
          } else {
            // 根结点
            if (width < this.$el.clientWidth) {
              box.w = width
            } else {
              box.w = this.$el.clientWidth
            }
          }
        }
      },

      // 调整区域（递归）
      resizeBoxH(box, height) {
        if (height < this.minH) {
          height = this.minH
        }

        if (box.h !== height) {
          if (box.parent) {
            const parent = this.boxMap[box.parent],
              others = this.boxs.filter(d => d.parent === box.parent && d.id !== box.id)
            if (parent.mode === 'row') {
              const add = height - box.h
              this.resizeBoxH(parent, parent.h + add)

              // 下侧区域调整横坐标
              others.filter(d => d.y > box.y).forEach(b => {
                this.autoYBox(b, add)
              })
              box.h += add
            } else if (parent.mode === 'col') {
              const max = Math.max(height, ...others.map(x => x.h))
              this.resizeBoxH(parent, max)
              box.h = height
            }
          } else {
            // 根结点
            this.$el.parentElement.scrollBy(0, height - box.h)
            box.h = height
          }
        }
      },

      // 主面板拖拽事件，须谨慎使用
      handleDrag(e) {
        if (this.lineType) {
          const rect = this.$el.getBoundingClientRect(),
            box = this.boxMap[this.cBox],
            ex = e.clientX - rect.left - box.x,
            ey = e.clientY - rect.top - box.y

          if (this.lineType === 'col') {
            this.resizeBoxW(box, ex)
          } else if (this.lineType === 'row') {
            this.resizeBoxH(box, ey)
          }

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
        this.lineType = null
      },

      // 主面板鼠标离开事件
      handleLeave() {
        this.lineType = null
      },

      // 对当前节点进行水平分割
      splitBoxH() {
        const pp = this.boxMap[this.cBox],
          xx = pp.lw ? pp.lx : pp.x,
          ww = pp.lw ? pp.lw : pp.w
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: xx,
          y: pp.y,
          w: ww,
          h: pp.h / 2,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: xx,
          y: pp.y + pp.h / 2,
          w: ww,
          h: pp.h / 2,
          parent: pp.id
        }

        this.boxs.push(box1, box2)
        pp.mode = 'row'
        this.cBox = box1.id
      },

      // 对当前节点进行垂直分割
      splitBoxV() {
        const pp = this.boxMap[this.cBox],
          xx = pp.lw ? pp.lx : pp.x,
          ww = pp.lw ? pp.lw : pp.w
        const box1 = {
          id: uuid().replace(/-/g, ''),
          x: xx,
          y: pp.y,
          w: ww / 2,
          h: pp.h,
          parent: pp.id
        }
        const box2 = {
          id: uuid().replace(/-/g, ''),
          x: xx + ww / 2,
          y: pp.y,
          w: ww / 2,
          h: pp.h,
          parent: pp.id
        }
        this.boxs.push(box1, box2)
        pp.mode = 'col'
        this.cBox = box1.id
      },

      // 删除当前节点
      deleteBox() {
        const box = this.boxMap[this.cBox]

        if (box.id === this.rootBox.id) {
          this.$message.error('不能删除根节点')
        } else {
          const parent = this.boxMap[box.parent],
            others = this.boxs.filter(d => d.parent === box.parent && d.id !== box.id)

          if (parent.mode === 'col') {
            others.filter(d => d.x > box.x).forEach(bb => {
              this.autoXBox(bb, -box.w)
            })
            this.resizeBoxW(parent, parent.w - box.w)
          } else if (parent.mode === 'row') {
            others.filter(d => d.y > box.y).forEach(bb => {
              this.autoYBox(bb, -box.h)
            })
            this.resizeBoxH(parent, parent.h - box.h)
          }

          if (others.length === 1) {
            // 唯一节点，删除父节点
            const other = others[0]
            if (parent.id === this.rootBox.id) {
              delete other.parent
            } else {
              other.parent = parent.parent
            }
            this.boxs.splice(this.boxs.findIndex(b => b.id === parent.id), 1)
          }

          this.boxs.splice(this.boxs.findIndex(b => b.id === box.id), 1)
          this.cBox = null
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .tbox-view {
    position: relative;
    background-color: #f3f3f3;

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
      border-radius: 10px;
      border: 1px solid #ddd;
      background-color: white;
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
        cursor: ew-resize;

        &:after {
          content: '';
          width: 2px;
          right: 9px;
          top: 0;
          bottom: 0;
        }
      }

      &.row {
        height: 20px;
        cursor: ns-resize;

        &:after {
          content: '';
          height: 2px;
          left: 0;
          right: 0;
          bottom: 9px;
        }
      }
    }
  }
</style>
