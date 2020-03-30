<template>
  <div class="x-box" :class="box.child?null:'leaf'" :style="boxStyle()">
    <template v-if="box.child">
      <x-box v-for="box in box.child" :key="box.id" :box="box"></x-box>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'XBox',

    props: {
      box: {
        default() {
          return {}
        }
      }
    },

    methods: {
      boxStyle() {
        const res = {
          flexDirection: this.box.way === 'h' ? 'column' : null,
          width: this.box.w ? this.box.w * 100 + '%' : null,
          height: this.box.h ? this.box.h + 'px' : null
        }
        console.log(111, res)
        return res
      }
    }
  }
</script>