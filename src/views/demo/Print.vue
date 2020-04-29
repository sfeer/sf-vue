<template>
  <!-- 局部打印 -->
  <div>
    <div class="header"></div>
    <div class="admission-ticket">准考证</div>
    <a-button @click="printTicket">打印</a-button>
  </div>
</template>

<script>
  export default {
    methods: {
      // 打印
      printTicket() {
        window.print();
      }
    }
  }
</script>