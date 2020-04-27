<template>
  <div>
    <a-button @click="shareQQ">QQ</a-button>
    <a-button @click="shareWeibo">微博</a-button>
  </div>
</template>

<script>
  /**
   * https://github.com/overtrue/share.js
   *
   * qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
   * qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
   * weibo: 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
   * wechat: 'javascript:',
   * douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
   * linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
   * facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
   * twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
   * google: 'https://plus.google.com/share?url={{URL}}'
   */

  export default {
    data() {
      return {
        url: 'https://www.jianshu.com/p/a761a4221213',
        title: 'web端进行QQ和微信的分享',
        summary: '测试测试web端进行QQ和微信的分享，测试测试web端进行QQ和微信的分享。'
      }
    },



    methods: {
      shareQQ() {
        const url = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(this.url)}&title=${this.title}&summary=${this.summary}`
        window.open(url, '_blank')
      },

      shareWeibo() {
        const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(this.url)}&title=${this.title}`
        window.open(url, '_blank')
      }
    }
  }
</script>