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
      <div style="margin:auto;width:1292px;display: flex;">
        <!-- 左侧布局 -->
        <div class="left-main">
          <!-- 局党组成员 -->
          <div class="member">
            <div class="member-header">
              <p class="member-title">局党组成员</p>
              <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
            </div>
            <div class="member-content">
              <div class="one-user">
                <img src="../assets/index/user.png" alt="">
                <span>张亚斌</span>
              </div>
              <div class="user-box">
                <div class="other-user">吴镇丰</div>
                <div class="other-user">李新忠</div>
                <div class="other-user">洪美宣</div>
              </div>
            </div>
          </div>
          <!-- 部门主页 -->
          <div class="branch">
            <div class="member-header">
              <p class="member-title">部门主页</p>
              <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
            </div>
            <ul class="branch-content">
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
              <li class="one-branch">
                <div class="one-branch-dot">办公室</div>
                <div class="one-branch-dot">计划处</div>
                <div class="one-branch-dot">投资处</div>
              </li>
            </ul>
          </div>
          <!-- 单位主页 -->
          <div class="unit">
            <div class="member-header">
              <p class="member-title">单位主页</p>
              <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
            </div>
            <ul class="unit-content">
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
              <li class="unit-content-one">福田区局(公司)</li>
              <li class="unit-content-one">罗湖区局(公司)</li>
            </ul>
          </div>
          <!-- 工作专题 -->
          <div class="work-project">
            <div class="member-header">
              <p class="member-title">工作专题</p>
              <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
            </div>
            <div class="work-project-content">
              <div class="work-project-content-ff">反腐倡廉</div>
              <div class="work-project-content-ff wm">文明吸烟环境建设</div>
              <div class="work-project-content-ff tj">推进企业精益管理</div>
              <div class="work-project-content-ff bs">办事公开 民主管理</div>
            </div>
          </div>
          <!-- 电子刊物 -->
          <div class="electronic-book">
            <div class="member-header">
              <p class="member-title">电子刊物</p>
              <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
            </div>
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
        <div class="right-main">
          <!-- 轮播图 -->
          <div style="display:flex;margin-bottom:10px">
            <div>
              <div class="banner-box">
                <div class="banner-title">
                  <div style="font-weight:bold">图片新闻</div>
                  <div>更多</div>
                </div>
                <div class="banner">
                  <a-carousel :afterChange="onChange">
                    <div>
                      <img src="../assets/index/banner.png" alt="">
                    </div>
                    <div>
                      <img src="../assets/index/banner.png" alt="">
                    </div>
                    <div>
                      <img src="../assets/index/banner.png" alt="">
                    </div>
                    <div>
                      <img src="../assets/index/banner.png" alt="">
                    </div>
                  </a-carousel>
                </div>
              </div>
              <div class="new-list-box">
                <div class="banner-title">
                  <div style="font-weight:bold">深烟新闻</div>
                  <div>更多</div>
                </div>
                <ul class="new-list">
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div style="margin-left:9px">
              <div class="user-login">
                <div class="member-header">
                  <p class="member-title">用户登入</p>
                  <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
                </div>
                <div class="user-login-content">
                  <div @click="swichType">
                    <img src="../assets/index/qrcode.png" alt="" class="login-type" v-show="loginType">
                    <img src="../assets/index/account.png" alt="" class="login-type" v-show="!loginType">
                  </div>
                  
                  <div class="user-name">
                    <div class="user-icon">

                    </div>
                    <input type="text" placeholder="用户名" class="user-input">
                  </div>
                  <div class="user-name">
                    <div class="user-icon">

                    </div>
                    <input type="text" placeholder="密码" class="user-input">
                  </div>
                  <div class="login-tip">
                    <span style="margin-right:23px">口令修改</span>
                    <span>忘记密码</span>
                  </div>
                  <div class="login-btn">登陆</div>
                  <div class="login-btn">取消</div>
                </div>
              </div>
              <div class="logo-navg">
                <div class="member-header">
                  <p class="member-title">应用导航</p>
                  <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
                </div>
                <div class="logo-navg-content">
                  <p class="text">
                    集成门户
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 中间图片 -->
          <div style="margin-bottom:13px">
            <img src="../assets/index/mainBg.png" alt="">
          </div>
          <div style="display:flex;margin-bottom:13px">
            <div style="margin-right:9px">
              <div class="new-list-box" style="margin-bottom:12px;height:226px">
                <div class="banner-title">
                  <div style="font-weight:bold">基层新闻</div>
                  <div>更多</div>
                </div>
                <ul class="new-list">
                  <li class="new-list-one other-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one other-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one other-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one other-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one other-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="new-list-box">
                <div class="banner-title">
                  <div style="font-weight:bold">工作交流</div>
                  <div>更多</div>
                </div>
                <ul class="new-list">
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                  <li class="new-list-one">
                    <div class="list-dot"></div>
                    <div class="list-text">
                      <p>省局(公司)传达学习2019年全国烟草工作会议精神</p>
                      <p>2019-06-10</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div class="work-notice">
                <div class="member-header">
                  <p class="member-title">行业公告</p>
                  <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
                </div>
                <ul class="work-notice-content">
                  <li class="one-notice-content">
                    信息标题1
                  </li>
                  <li class="one-notice-content">
                    信息标题2
                  </li>
                  <li class="one-notice-content">
                    信息标题3
                  </li>
                </ul>
              </div>
              <div class="work-project">
                <div class="member-header">
                  <p class="member-title">工作专题</p>
                  <img src="../assets/index/blue-right-bg.png" alt="" class="member-img">
                </div>
                <div class="work-project-content">
                  <div class="work-project-content-ff fz">法治烟草建设</div>
                  <div class="work-project-content-ff gq ">共青团工作</div>
                  <div class="work-project-content-ff zx">“云袅一号”专项行动</div>
                </div>
              </div>
            </div>
          </div>
          <div class="worker-home">
            <div class="home-title">
              <!-- <img src="../assets/index/home-bg.png" alt="" class="home-bg"> -->
              <div class="home-bg">
                职工之家
              </div>
            </div>
            <ul class="home-content">
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
              <li class="one-content">
                <div class="one-content-title">
                  <div>文学分部</div>
                  <div>更多</div>
                </div>
                <ul class="small-list">
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                  <li class="one-small-list">忆故乡[杨芳]</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </div>
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
  import { Carousel } from 'ant-design-vue';
  export default {
    name: 'index',
    data() {
      return{
        loginType: false
      }
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      onChange() {

      },
      swichType() {
        this.loginType = !this.loginType
      }
    },
    components:{
      [Carousel.name] : Carousel,
    }
  }
  
</script>