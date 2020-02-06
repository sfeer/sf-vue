<template>
  <div>111</div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    mounted() {
      this.$http.get('/user/info').then(res => {
        console.log(res)
      })
    }
  }
</script>