<template>
  <div>
    <div>=======</div>
    <slot name="up" :upx="up" :upy="down"></slot>
    <div>-------</div>
    <slot name="down" :downy="down"></slot>
    <div>=======</div>
  </div>
</template>

<script>
  export default {
    name: 'SfUser',

    data() {
      return {
        up: {up1: 1, up2: 2},
        down: {down1: 3, down2: 4}
      }
    }
  }
</script>