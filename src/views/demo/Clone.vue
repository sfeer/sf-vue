<template>
  <div>
    <pre>{{arr}}</pre>
    <div>--------------------</div>
    <pre>{{clone}}</pre>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [],
        clone: []
      }
    },

    created() {
      this.arr = [
        {x: 'a', y: {k: 'k', v: 'v'}},
        {x: 'b', y: {k: 'k', v: 'v'}}
      ]
      this.clone = JSON.parse(JSON.stringify(this.arr))
      // this.clone = this.arr
    },

    mounted() {
      setTimeout(() => {
        this.arr[1].y.k = 'kk'
      }, 1800)
    }
  }
</script>