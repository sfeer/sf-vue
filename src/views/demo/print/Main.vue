<template>
  <!-- 局部打印 -->
  <div>
    <div class="header"></div>
    <div class="body">
      <div class="left">
        <div class="box">打印准考证</div>
      </div>
      <div class="right">
        <div class="title">准考证打印</div>
        <div class="btn" @click="printTicket">打印</div>
        <iframe ref="print-ifr" class="print-content" src="/demo/print/ticket" frameBorder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      // 打印
      printTicket() {
        this.$refs['print-ifr'].contentWindow.print()
        // window.open('/demo/print/ticket', '_blank')
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 160px;
    background: url("../../../assets/demo/print/bg.png");
    background-size: 100% 100%;
  }

  .body {
    width: 1200px;
    margin: 0 auto;
    padding-top: 32px;
  }

  .left {
    float: left;

    .box {
      background-color: #e0f3f2;
      width: 240px;
      height: 80px;
      font-size: 20px;
      font-family: "Microsoft YaHei UI", sans-serif;
      margin-right: 40px;
      padding-left: 28px;
      line-height: 80px;
      font-weight: bold;
      border-left: 4px solid #64c2bc;
    }
  }

  .right {
    float: right;
    position: relative;
    width: 920px;

    .title {
      text-align: center;
      font-size: 28px;
      font-family: "Microsoft YaHei UI", sans-serif;
    }

    .btn {
      position: absolute;
      top: 0;
      right: 140px;
      color: white;
      background-color: #24d6b3;
      width: 80px;
      height: 32px;
      line-height: 32px;
      border-radius: 6px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
    }

    .print-content {
      margin-bottom: 40px;
      position: absolute;
      top: 35px;
      left: 140px;
      right: 140px;
      width: 640px;
      height: 826px;
    }
  }
</style>