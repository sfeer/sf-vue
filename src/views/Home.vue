<template>
  <div class="home">
    hahaha
  </div>
</template>

<script>
  export default {
    name: 'home',

    created() {
      this.$ss.set('HEHE', 'hehe')
      this.$ls.set('HAHA', 'haha')
    }
  }
</script>
