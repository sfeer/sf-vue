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
        <div class="box-inner">
          <template v-if="cBox===box.id">
            <a-button type="dashed" icon="plus" class="box-add">添加</a-button>
            <a-button icon="plus" class="box-add"/>
          </template>
          <component v-else-if="box.component" :is="box.component.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TBox',

    data() {
      return {
        cBox: null,
        dragPoint: false // 是否拖拽调整点
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
    },

    methods: {
      // 主面板拖拽事件，须谨慎使用
      handleDrag(e) {
        if (this.dragPoint) { // 拖拽调整点
          const rect = this.$el.getBoundingClientRect(),
            box = this.boxMap[this.cLine],
            line = box.line,
            ex = e.clientX - rect.left - box.x,
            ey = e.clientY - rect.top - box.y

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
        this.dragPoint = false
      },

      // 区域样式
      boxStyle(box) {
        return {
          top: box.y + 'px',
          left: box.x + 'px',
          width: box.w + 'px',
          height: box.h + 'px',
          padding: this.padding / 2 + 'px'
        }
      },

      // 点击区域
      boxClick(box) {
        this.cBox = box.id
        this.$emit('boxClick', box)
      },
    }
  }
</script>
