<template>
  <div class="boxs">
    <div
        v-for="box in showBoxs"
        :key="box.id"
        class="box"
        :style="boxStyle(box)">
      <component v-if="box.component" :is="box.component.name"/>
    </div>
    <resize-observer @notify="handleResize"/>
  </div>
</template>

<script>
  export default {
    name: 'TBoxView',

    props: {
      boxs: {
        type: Array,
        default() {
          return []
        }
      }
    },

    computed: {
      rootBox() {
        return this.boxs.find(d => d.parent === undefined)
      },

      showBoxs() {
        return this.boxs.filter(o => o.mode === undefined)
      }
    },

    watch: {
      boxs(v, o) {
        // 初始化的时候
        if (v.length > 0 && o.length === 0) {
          this.handleResize()
        }
      }
    },

    methods: {
      boxStyle(box) {
        return {
          top: box.y + 'px',
          left: box.x + 'px',
          width: box.w + 'px',
          height: box.h + 'px'
        }
      },

      // 自动改变区域宽度（递归）
      autoWidthBox(box, width) {
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

      handleResize() {
        this.autoWidthBox(this.rootBox, this.$el.clientWidth)
      }
    }
  }
</script>

<style scoped>
  .boxs {
    position: relative;
  }

  .box {
    position: absolute;
  }
</style>