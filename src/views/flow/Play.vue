<template>
  <div id="sflow-play">
    <s-flow
        style="height:900px"
        :nodes="nodes"
        :links="links"
        mode="play"
        :node-class="node=>node.type"/>
  </div>
</template>

<script>
  import {v4 as uuid} from 'uuid'

  export default {
    data() {
      return {
        nodes: [
          {
            id: 'node-1', name: '开始', type: 'StartNoneEvent', icon: 'caret-right',
            x: 80, y: 80, w: 80, h: 40, play: 'played'
          },
          {
            id: 'node-2', name: '请假申请', type: 'ServiceTask', icon: 'bulb',
            x: 300, y: 200, w: 160, h: 80, play: 'played'
          },
          {
            id: 'node-3', name: '领导审批', type: 'UserTask', icon: 'user',
            x: 570, y: 100, w: 120, h: 40, play: 'playing'
          },
          {
            id: 'node-4', name: '请假时间', type: 'InclusiveGateway', icon: 'clock-circle', play: 'noplay',
            x: 480, y: 400, w: 120, h: 60
          },
          {
            id: 'node-5', name: '结束', type: 'EndNoneEvent', icon: 'stop', play: 'noplay',
            x: 730, y: 60, w: 80, h: 40
          },
          {
            id: 'node-6', name: '自由流程', type: 'FreeProcess', icon: 'home', play: 'playing',
            x: 620, y: 230, w: 160, h: 80,
            child: [
              {
                id: 'node-11', name: '经理签字', type: 'UserTask', icon: 'user', play: 'played',
                child: [
                  {id: 'node-111', name: '财务签字', type: 'UserTask', icon: 'user', play: 'playing'}
                ]
              },
              {
                id: 'node-12', name: '商务签字', type: 'UserTask', icon: 'user',
                child: [
                  {id: 'node-121', name: '评审会', type: 'UserTask', icon: 'user'},
                  {id: 'node-122', name: '审计签字', type: 'UserTask', icon: 'user'}
                ]
              }
            ]
          },
          {
            id: 'node-7', name: '子流程', type: 'SubProcess', icon: 'setting', play: 'noplay',
            x: 120, y: 480, w: 400, h: 200,
            sub: {
              nodes: [
                {
                  id: 'node-1', name: '开始', type: 'StartNoneEvent', icon: 'caret-right',
                  x: 20, y: 80, w: 80, h: 40
                },
                {
                  id: 'node-2', name: '领导签字', type: 'UserTask', icon: 'user',
                  x: 140, y: 80, w: 80, h: 40
                },
                {
                  id: 'node-3', name: '结束', type: 'StartNoneEvent', icon: 'stop',
                  x: 260, y: 80, w: 80, h: 40
                }
              ],
              links: [
                {
                  id: 'link-1', name: 'he', way: 'h',
                  s: 'node-1', t: 'node-2'
                },
                {
                  id: 'link-2', name: 'ha', way: 'h',
                  s: 'node-2', t: 'node-3'
                },
              ]
            }
          }
        ],

        links: [
          {
            id: 'link-1', name: 'ddsada', way: 'v',
            s: 'node-1', t: 'node-2', play: 'played'
          },
          {
            id: 'link-2', name: 'ta', way: 'h',
            s: 'node-2', t: 'node-3'
          },
          {
            id: 'link-3', name: 'ta', way: 'h',
            s: 'node-2', t: 'node-4', play: 'played'
          },
          {
            id: 'link-4', name: 'ta', way: 'h',
            s: 'node-4', t: 'node-2', play: 'goback'
          },
          {
            id: 'link-5', name: 'ta', way: 'l',
            s: 'node-5', t: 'node-1', play: 'free'
          },
        ]
      }
    },

    created() {
      // 数据处理
      this.nodes.forEach(node => {
        if (node.type === 'FreeProcess') {
          // 自由流程
          const free = {nodes: [], links: [], level: 0, leafs: 0, show: true, w: node.w, h: node.h}
          this._loopFreeData(free, {
            id: node.id,
            name: node.name,
            child: node.child,
            icon: node.icon
          })
          node.w = 150 * (free.level - 1) + 100 + 47
          node.h = 60 * (free.leafs - 1) + 40
          node.free = free
        }
      })
    },

    methods: {
      // 递归自由流程树结构数据
      _loopFreeData(data, node, level = 1) {
        if (level > data.level) {
          data.level = level
        }
        if (node.child && node.child.length > 0) {
          node.child.forEach(o => {
            this._loopFreeData(data, o, level + 1)
            data.links.push({
              id: 'link_' + uuid().replace(/-/g, ''),
              s: node.id,
              t: o.id,
              way: 'l'
            })
          })
          node.y = (node.child[0].y + node.child[node.child.length - 1].y) / 2
        } else {
          node.y = 60 * data.leafs++
        }
        node.w = 100
        node.h = 40
        node.x = 150 * (level - 1)
        data.nodes.push(node)
      },
    }
  }
</script>

<style lang="less">
  #sflow-play {
    .FreeProcess.free-show {
      background: transparent;
      border-color: #999;
      animation: none;

      &.playing {
        border-color: #ffbf00;
      }

      &.played {
        border-color: #3892d3;
      }
    }
  }
</style>
