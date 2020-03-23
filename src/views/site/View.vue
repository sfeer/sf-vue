<template>
  <s-box-view :boxs="boxs" mode="view"/>
</template>

<script>
  import SBoxView from '../../components/SBox/SBoxView'
  import {getSite} from '../../api/site'

  export default {
    data() {
      return {
        siteId: '',
        boxs: [],
        metas: []
      }
    },

    metaInfo() {
      return {
        meta: this.metas
      }
    },

    components: {SBoxView},

    created() {
      this.siteId = this.$route.params.sid
      console.log('site id', this.siteId)
      // 获取boxs
      getSite(this.siteId).then(d => {
        if (d.errcode === 0) {
          this.boxs = d.data.boxs

          // 获取meta
          this.metas = [
            {content: 'haha', name: 'aaa'},
            {content: 'hehe', name: 'bbb'}
          ]
        } else {
          this.$message.error(d.errmsg)
        }

        document.dispatchEvent(new Event('render-event'))
      })
    }
  }
</script>
