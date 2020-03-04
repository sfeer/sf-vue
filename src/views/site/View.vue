<template>
  <div>{{siteId}}</div>
</template>

<script>
  export default {
    data() {
      return {
        siteId: ''
      }
    },

    created() {
      this.siteId = this.$route.params.sid
      console.log('site id', this.siteId)
    }
  }
</script>
