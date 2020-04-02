<template>
  <div>111</div>
</template>
<script>
  export default {
    created() {
      console.log(WebSocket, window.location.host)
      const ws = new WebSocket(`ws://${window.location.host}/websocket/chat/Sfeer`)
      ws.onopen = () => {
        ws.send('hello')
      }
    }
  }
</script>