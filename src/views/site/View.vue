<template>
  <s-box :boxs="boxs" mode="view"/>
</template>

<script>
  import SBox from '../../components/SBox/SBox'
  import {getSite} from '../../api/site'

  export default {
    data() {
      return {
        siteId: '',
        boxs: []
      }
    },

    components: {SBox},

    created() {
      this.siteId = this.$route.params.sid
      console.log('site id', this.siteId)
      // 获取boxs
      getSite(this.siteId).then(d => {
        this.boxs = d.boxs
      })
    }
  }
</script>
