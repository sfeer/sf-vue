<template>
  <div class="content">
    <div class="header">
      <div class="header-bg">
        <img src="../assets/index/logo.png" class="logo">
        <div class="name">
          <p style="letter-spacing:17px">深圳市烟草专卖局</p>
          <p>中国烟草总公司深圳市公司</p>
        </div>
      </div>
      <div class="navigation">
        <ul class="menu">
          <li class="menu-one">首页</li>
          <li class="menu-one">行业概况</li>
          <li class="menu-one">深烟资讯</li>
          <li class="menu-one">法律公文</li>
          <li class="menu-one">党建工作</li>
          <li class="menu-one">职工之家</li>
          <li class="menu-one">办事公开</li>
        </ul>
        <div class="searchBox">
          <input type="text" class="search-input">
          <span class="search-btn">搜索</span>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 左侧布局 -->
      <div class="left-main">
        <!-- 局党组成员 -->
        <div class="member">
          <p class="member-title">局党组成员</p>
        </div>
        <!-- 部门主页 -->
        <div class="branch">
          <p class="branch-title">部门主页</p>
        </div>
        <!-- 单位主页 -->
        <div class="unit">
          <p class="unit-title">单位主页</p>
        </div>
        <!-- 工作专题 -->
        <div class="work-project">
           <p class="work-project-title">工作专题</p>
        </div>
        <!-- 电子刊物 -->
        <div class="electronic-book">
          <p class="electronic-book-title">电子刊物</p>
          <div class="electronic-book-content">
            <p class="text">
              （深圳烟草）杂志
            </p>
            
          </div>
        </div>
        <!-- 常用链接 -->
        <div >
          <a-select defaultValue="lucy" @change="handleChange" class="common-use">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- 右侧布局 -->
      <div class="right-main"></div>
    </div>
    <div class="footer">
      <p>本站含有烟草内容，如果您是18岁以下人士，敬请回避！</p>
      <p>深圳烟草专卖局，中国烟草总公司深圳市公司主办</p>
      <p>地址：深圳市福田区福华一路28号特美思大厦(邮编:518408)</p>
      <p>网站访问量:102356</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return{}
    },
    methods: {
      handleChange(value) {
        console.log(value)
      }
    }
  }
  
</script>