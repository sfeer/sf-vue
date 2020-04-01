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
    name: 'SBoxView',

    props: {
      boxs: {
        type: Array,
        default() {
          return []
        }
      }
    },

    computed: {
      showBoxs() {
        return this.boxs.filter(o => o.line === undefined)
      }
    },

    watch: {
      boxs(v, o) {
        // 初始化的时候
        if (v.length > 0 && o.length === 0) {
          const root = v.find(d => d.parent === undefined)
          root.w = this.$el.clientWidth
          this.resizeBox(root)
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

      // 改变区域（递归）
      resizeBox(box) {
        if (box.line) {
          const line = box.line
          if (line.way === 'v') {
            const vv = Math.round(box.w * line.pc / 100)
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

      handleResize() {
        const root = this.boxs.find(d => d.parent === undefined)
        root.w = this.$el.clientWidth
        this.resizeBox(root)
      },
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