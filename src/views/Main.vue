<template>
  <div>
    <div>测试</div>
    <div>流程编辑器</div>
    <div>网页编辑器</div>
    <div>企业微信</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.dispatchEvent(new Event('render-event'))
    }
  }
</script>