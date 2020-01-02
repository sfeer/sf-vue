<template>
  <div class="sbox-wrapper">
    <div class="sbox-tools">
      <a-button type="primary" class="tool" @click="hh" :disabled="cBox===null">水平分割</a-button>
      <a-button type="primary" class="tool" @click="vv" :disabled="cBox===null">垂直分割</a-button>
      <a-button type="primary" class="tool">预览</a-button>
      <a-button type="primary" class="tool">保存</a-button>
      <a-button type="primary" class="tool" @click="add2">新增二分栏</a-button>
      <a-button type="primary" class="tool" @click="add3">新增三分栏</a-button>
      <a-button type="primary" class="tool" @click="add4">新增四分栏</a-button>
      <a-button type="primary" class="tool" @click="test">测试</a-button>
    </div>
    <div ref="main" class="sbox-view" @mousemove="handleDrag" @mouseup="handleDragEnd">
      <div class="boxs">
        <div
            v-for="box in showBoxs"
            :key="box.id"
            :class="['box', {active:cBox===box.id}]"
            :style="boxStyle(box)"
            @click="boxClick(box.id)">
          <a-button type="dashed" icon="plus" class="box-add" v-show="cBox===box.id">添加</a-button>
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

    <a-modal
        title="测试"
        :visible="true">
      <div ref="test" @mousemove="testDrag"
           style="position:relative;width:100%;height: 400px;background: #3892d3;margin: 400px 0">
        <div style="height:80px; width: 120px;position: absolute; top:100px;left:100px;background: #e65a44"></div>
        <div>{{ex}},{{ey}}</div>
        <div>{{x1}},{{y1}}</div>
        <div>{{x2}},{{y2}}</div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import uuid from 'uuid'
  import {getElementLocation} from '../utils/util'

  export default {
    data() {
      return {
        root: null,
        boxs: [],
        cBox: null, // 当前选中区域

        minW: 100, // 最小宽度
        minH: 50, // 最小高度

        padding: 10, // 分割线宽度
        cLine: null, // 当前选中分割线

        ex: 0,
        ey: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
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
      this.resizeInterval = setInterval(() => {
        const root = this.boxMap[this.root],
          home = this.$refs.main
        root.w = home.clientWidth
      }, 1000)
      this.root = uuid().replace(/-/g, '')
      this.boxs.push({
        id: this.root,
        x: 0,
        y: 0,
        w: 500,
        h: 500,
        leaf: true
      })
      this.cBox = this.root
    },

    beforeDestroy() {
      clearInterval(this.resizeInterval)
    },

    methods: {
      testDrag(e) {
        // const ff = getElementLocation(this.$refs.test, e)
        const test = this.$refs.test
        console.log(test.getBoundingClientRect())
        this.x1 = test.getBoundingClientRect().left
        this.y1 = test.getBoundingClientRect().top
        this.x2 = e.pageX
        this.y2 = e.pageY
        this.ex = this.x2 - this.x1
        this.ey = this.y2 - this.y1
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
      resizeBox(box, val) {
        if (box.leaf === false) {
          const p = this.padding / 2
          if (box.vv) {
            const c1 = this.boxs.find(b => b.parent === box.id && b.x === box.x),
              c2 = this.boxs.find(b => b.parent === box.id && b.x !== box.x)
            this.resizeBox(c1, {
              x: val.x,
              y: val.y,
              w: val.w * box.vv / 100 - p,
              h: val.h
            })
            this.resizeBox(c2, {
              x: val.x + val.w * box.vv / 100 + p,
              y: val.y,
              w: val.w * (100 - box.vv) / 100 - p,
              h: val.h
            })
          } else if (box.hh) {
            const c1 = this.boxs.find(b => b.parent === box.id && b.y === box.y),
              c2 = this.boxs.find(b => b.parent === box.id && b.y !== box.y)
            this.resizeBox(c1, {
              x: val.x,
              y: val.y,
              w: val.w,
              h: val.h * box.hh / 100 - p
            })
            this.resizeBox(c2, {
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
          const ex = e.offsetX, ey = e.offsetY,
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

          this.resizeBox(box, {
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

      test() {
        console.log(this.boxs)
      },

      hh() {
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

      vv() {
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

      add2() {
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
        console.log('haha', oldBox.h, oldBox.h + 100 + this.padding)
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

        console.log('haha', this.boxs, newBox)
      },

      add3() {
      },

      add4() {
      }
    }
  }
</script>

<style lang="less" scoped>
  .sbox-wrapper {
    padding: 10px;
  }

  .sbox-tools {
    margin-bottom: 10px;

    .tool {
      margin-right: 10px;
    }
  }

  .sbox-view {
    height: 600px;

    .boxs, .lines {
      position: relative;
    }

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
    }

    .box-add {
      border-radius: 5px;
      margin: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
    }
  }
</style>
