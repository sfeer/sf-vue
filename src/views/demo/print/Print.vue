<template>
  <div style="padding-top: 50px;">
    <div class="admission-ticket">
    <div class="ticket-title">海南省烟草专卖局</div>
    <div class="ticket-title">招聘*****管理人员笔试准考证</div>
    <table class="table" border="1">
      <tr>
        <td class="label">姓名</td>
        <td>张三</td>
        <td class="label">性别</td>
        <td>男</td>
      </tr>
      <tr>
        <td class="label">准考证号</td>
        <td colspan="3">202004250321</td>
      </tr>
      <tr>
        <td class="label">身份证号</td>
        <td colspan="3">46000000000000</td>
      </tr>
      <tr>
        <td class="label">笔试地点</td>
        <td colspan="3">xxxx市xxx路xxx号xxx局</td>
      </tr>
      <tr>
        <td class="label">笔试时间</td>
        <td colspan="3">2020年05月01日 09:00---11:30</td>
      </tr>
    </table>
    <div class="remark">
      <div>注意事项：</div>
      <div><pre>&emsp;&emsp;&emsp;&emsp;1.应试人员参加笔试须携带本人身份证，并在进入考场后将证件放于桌面左上角备查；</pre></div>
      <div><pre>&emsp;&emsp;&emsp;&emsp;2.应试人员不得携带除文具之外的任何资料、物品进入考场，考试期间不得使用任何通讯工具；</pre></div>
      <div><pre>&emsp;&emsp;&emsp;&emsp;3.应试人员要服从监考人员的安排，严格遵守考场纪律。违反考场纪律的，取消考试资格；</pre></div>
      <div><pre>&emsp;&emsp;&emsp;&emsp;4.应试人员提前30分钟进入考场，笔试开始后60分钟才准离开考场，考试结束后，不得将试卷带出考场；</pre></div>
      <div><pre>&emsp;&emsp;&emsp;&emsp;5.除卷面不清晰外，应试人员不得向监考人员询问任何与试题内容有关的问题。</pre></div>
    </div>
  </div>
  </div>
</template>

<style lang="less" scoped>
  .admission-ticket {
    width: 640px;
    margin: 0 auto;
    border: 1px solid #707070;
    padding: 40px;
    font-family: SimSun, sans-serif;
    color: #444;

    .ticket-title {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
    }

    .table {
      margin-top: 28px;
      width: 100%;

      .label {
        text-align: center;
      }

      td {
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        padding: 0 23px;
        font-weight: bold;
      }
    }

    .remark {
      margin-top: 20px;
      line-height: 24px;
      font-size: 16px;
      font-weight: bold;

      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
      }
    }
  }
</style>