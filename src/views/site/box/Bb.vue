<template>
  <div class="bb">bbbbbbbb</div>
</template>

<script>
  console.log('bbbb', 'init')

  export default {
    name: 'Bb',

    mounted() {
      console.log('bbbb', 'mounted')
    }
  }
</script>

<style scoped>
  .bb {
    width: 100%;
    height: 100%;
    background: #7a8fe6;
  }
</style>