<template>
  <div class="sf-multi-tab">
    <a-button
        class="left-btn"
        icon="left"
        @click="goLeft"
        :disabled="leftShow"
        v-show="tabsWidth>centerWidth"/>
    <div class="center" ref="center">
      <div class="tabs " ref="tabs" :style="{transform:'translateX('+tabX+'px)'}">
        <a-tag
            v-for="(tab,index) in tabs"
            :key="tab.path"
            :class="['tab', {active:activeTab === tab.path}]"
            :closable="index>0"
            @click.stop="clickTab(tab.path)"
            @close.stop="closeTab(tab.path)">
          {{tab.name}}
        </a-tag>
      </div>
    </div>
    <a-button
        class="right-btn"
        icon="right"
        @click="goRight"
        :disabled="rightShow"
        v-show="tabsWidth>centerWidth"/>
  </div>
</template>

<script>
  import events from './events'
  import {mapGetters} from 'vuex'

  export default {
    name: 'MultiTab',

    data() {
      return {
        tabX: 0,
        centerWidth: 0,
        tabsWidth: 0,
        lastTabx: 0,
        rightShow:false,
        leftShow:true
      }
    },

    created() {
      const tabs = this.$ls.get('tabs')
      if (tabs !== null) {
        this.$store.dispatch('InitTabs', tabs)
      }

      // 绑定事件
      events.$on('open', (path, name) => {
        this.$store.dispatch('OpenTab', {
          path: path,
          name: name
        }).then((type) => {
          if(type) {
            if(this.tabsWidth > this.centerWidth){
              this.tabX = this.centerWidth - this.tabsWidth 
              this.rightShow = true
              console.log('新增' + this.rightShow);
              
            }
          } else {
            let a = this.$refs.tabs.getElementsByClassName('active')[0].offsetLeft   //距离左边的距离，当前
            if(a > this.centerWidth) {
              this.tabX = this.centerWidth - a - this.$refs.tabs.getElementsByClassName('active')[0].offsetWidth
            } else {
              this.tabX = 0
            }
            
            // offsetLeft
          }
          if(this.tabX < 0) {   //如果小于0 左移显示
            this.leftShow = false
            // this.rightShow = false
            if(this.tabsWidth - this.centerWidth - this.tabX  <= 10) {
              this.rightShow = true
            }
          } else {
            this.rightShow = false
            this.leftShow = true
          }
        })
        // 如果tab的长度超过了盒子的长度，那就直接将上面平移
      })

      events.$on('close', path => {
        this.closeTab(path)
      })

      this.$store.dispatch('OpenTab', {
        path: this.$route.fullPath, name: this.$route.meta.title
      })
    },

    computed: {
      ...mapGetters(['tabs', 'activeTab','pathBox']),
    },
    updated() {
      this.centerWidth = this.$refs.center.clientWidth
      this.tabsWidth = this.$refs.tabs.clientWidth
    },

    methods: {
      closeTab(path) {
        console.log(this.pathBox);
        console.log(String(path));
        let index = this.pathBox.indexOf(String(path))
        let array = this.$refs.tabs.getElementsByClassName('ant-tag')
        events.$emit('clear', path, () => {
          this.$store.dispatch('CloseTab', path)
        })
        // 如果tabx大于0那就减 小于0就加
          this.tabsWidth = this.tabsWidth - array[index].clientWidth
          if(this.tabsWidth <= this.centerWidth) {
            this.$refs.tabs.style.transform = 'translateX(0px)'
          } else {
            console.log(this.centerWidth - this.tabsWidth);
            this.tabX = this.centerWidth - this.tabsWidth
            this.rightShow = true
          }
          // this.$refs.tabs.style.transform = 'translateX('+ this.tabx - array[index].clientWidth +'px)'
       
        // if(this.tabsWidth < this.centerWidth) {
        //   console.log(111);
        //   this.$refs.tabs.style.transform = 'translateX(0px)'
          
        // }
      },

      clickTab(path) {
        this.$store.dispatch('ActiveTab', path)
      },

      goRight() {
        this.leftShow = false
        let width = this.tabsWidth - this.centerWidth  //总共大于的距离
        console.log(width);
        console.log(this.tabX);
        console.log(this.tabX + width);
        if(this.tabX + width >= 30 && this.tabX + width <= 60) {
          this.tabX -= this.tabX + width
          this.rightShow = true
        } else if(this.tabX + width >= 0 && this.tabX + width < 30){
           this.tabX -= this.tabX + width
           this.rightShow = true
        } else {
          this.tabX -= 30
        }
        
        // 此处可能要根据子元素超出父元素多少，减去已平移的宽度，计算出最后一次平移的距离
      },

      goLeft() {
        this.rightShow = false
        let width = this.tabsWidth - this.centerWidth  //总共大于的距离
        
        if(this.tabX+30 > 0 || this.tabX+30 > -10) {
          this.$refs.tabs.style.transform = 'translateX(0px)'
          this.leftShow = true
        } else {
          this.tabX += 30
        }
      }
    },

    watch: {
      activeTab(v) {
        if (this.$route.fullPath !== v)
          this.$router.push(v).catch(err => {
            
          })
      }
    }
  }
</script>
<style lang="less">
  .sf-multi-tab {
    display: flex;
    height: 26px;

    .center {
      flex: auto;
      overflow: hidden;
    }

    .tabs {
      display: flex;
      width: fit-content;
      transition: transform 0.3s;
    }

    .tab {
      padding: 7px 14px;
      line-height: 12px;
      height: 100%;
      border: 0;
      background-color: white;
    }

    .left-btn {

      padding: 0px 4px !important; 
      cursor: pointer;
      margin-right: 8px;
      height: 26px;
      background-color: white;
      color: #64C2BC;
      line-height: 26px;
      border: 0
    }

    .right-btn {
      cursor: pointer;
      padding: 0px 4px !important; 
      margin-left: 8px;
      height: 26px;
      background-color: white;
      color: #64C2BC;
      line-height: 26px;
      border: 0
    }
  }
</style>