<template>
  <div class="aa">aaaaaaaa</div>
</template>

<script>
  console.log('aaaa', 'init')

  export default {
    name: 'Aa',

    mounted() {
      console.log('aaaa', 'mounted')
    }
  }
</script>

<style scoped>
  .aa {
    width: 100%;
    height: 100%;
    background: #e69889;
  }
</style>