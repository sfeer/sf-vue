<!-- 新增页面，选择合适的模版新增 -->
<template>
  <div class="sbox-init">
    <template v-for="group in templateGroups">
      <div class="row-title">{{group.name}}</div>
      <div class="row">
        <div
            class="item"
            v-for="temp in group.templates"
            :key="temp.id"
            @click="selectTemplate(temp)">
          <img :src="temp.img" :alt="temp.name">
          <div class="item-title">{{temp.name}}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {getTemplateList} from '../../api/site'

  export default {
    data() {
      return {
        templates: []
      }
    },

    computed: {
      templateGroups() {
        const groups = []
        this.templates.forEach(temp => {
          const group = groups.find(g => g.name === temp.group)
          if (group) {
            group.templates.push(temp)
          } else {
            groups.push({name: temp.group, templates: [temp]})
          }
        })
        console.log(11122, groups)
        return groups
      }
    },

    created() {
      getTemplateList().then(d => {
        this.templates = d.data
      })
    },

    methods: {
      selectTemplate(temp) {
        // TODO 使用选定的模版新建网页，并切换到新建网页的设计模式
      }
    }
  }
</script>

<style lang="less" scoped>
  .row-title {
    font-size: 1.4rem;
    margin: 20px 8px 10px;
  }

  .row {
    display: flex;
  }

  .item {
    margin: 0 10px;
  }

  .item-title {
    margin: 8px 0;
  }
</style>