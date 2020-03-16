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
        boxs: []
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
        } else {
          this.$message.error(d.errmsg)
        }
      })
    }
  }
</script>
