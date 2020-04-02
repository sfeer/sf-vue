<template>
  <div>111</div>
</template>
<script>
  export default {
    created() {
      console.log(WebSocket)
      const ws = new WebSocket(`ws://${location.host}/websocket/chat/Sfeer`)
      ws.onopen = () => {
        ws.send('hello')
      }
    }
  }
</script>