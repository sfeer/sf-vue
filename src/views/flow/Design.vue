<template>
  <div id="sflow-demo">
    <s-flow
        style="height:600px"
        name="自定义流程名"
        :nodes="nodes"
        :links="links"
        :items="items"
        :tools="tools"
        :node-class="node=>node.type"
        :link-class="link=>link.type"
        @nodeClick="nodeClick"
        @nodeCreate="nodeCreate"
        @nodeDblclick="nodeDblclick"
        @toolClick="toolClick"
    />
    <pre>{{flowHistory}}</pre>
  </div>
</template>

<script>
  import uuid from 'uuid'

  export default {
    data() {
      return {
        flowMap: {},
        flowHistory: [],
        flowIndex: 0,

        rootFlow: {
          id: 'node-0', name: '子流程示例',
          sub: {
            nodes: [
              {
                id: 'node-1', name: '开始', type: 'StartNoneEvent', icon: 'caret-right',
                x: 80, y: 80, w: 80, h: 40
              },
              {
                id: 'node-2', name: '请假申请', type: 'SubProcess', icon: 'appstore',
                x: 220, y: 200, w: 400, h: 200,
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
              },
              {
                id: 'node-3', name: '领导审批', type: 'UserTask', icon: 'thunderbolt',
                x: 670, y: 100, w: 120, h: 40
              },
              {
                id: 'node-4', name: '请假时间', type: 'InclusiveGateway', icon: 'clock-circle',
                x: 650, y: 400, w: 120, h: 60
              },
              {
                id: 'node-5', name: '结束', type: 'EndNoneEvent', icon: 'stop',
                x: 840, y: 40, w: 80, h: 40
              }
            ],
            links: [
              {
                id: 'link-1', name: 'ddsada', way: 'v',
                s: 'node-1', t: 'node-2'
              },
              {
                id: 'link-2', name: 'ta', way: 'h',
                s: 'node-2', t: 'node-3'
              },
              {
                id: 'link-3', name: 'ta', way: 'l',
                s: 'node-3', t: 'node-4'
              }
            ]
          }
        },

        rootItems: [
          {name: '开始', icon: 'caret-right', type: 'StartNoneEvent'},
          {name: '定时开始', icon: 'clock-circle', type: 'StartTimerEvent'},
          {name: '结束', icon: 'stop', type: 'EndNoneEvent'},
          {name: '用户任务', icon: 'user', type: 'UserTask'},
          {name: '服务任务', icon: 'setting', type: 'ServiceTask'},
          {name: '子流程', icon: 'appstore', type: 'SubProcess'},
          {name: '条件分支', icon: 'fork', type: 'InclusiveGateway'},
          {name: '互斥分支', icon: 'fork', type: 'ExclusiveGateway'},
          {name: '分支聚合', icon: 'fork', type: 'ParallelGateway'},
          {name: '定时边界事件', icon: 'link', type: 'BoundaryTimerEvent'},
          {name: '区域', icon: 'gateway', type: 'Area'}
        ],

        subItems: [
          {id: 'items-1', name: '开始', icon: 'caret-right', type: 'StartNoneEvent'},
          {id: 'items-2', name: '结束', icon: 'stop', type: 'EndNoneEvent'},
          {id: 'items-3', name: '用户任务', icon: 'user', type: 'UserTask'},
          {id: 'items-4', name: '服务任务', icon: 'setting', type: 'ServiceTask'}
        ],

        items: [],

        nodes: [],

        tools: [
          {name: '前进', icon: 'right', type: 'forward', disabled: true},
          {name: '新增', icon: 'file'},
          {name: '保存', icon: 'save'},
          {name: '文本注释', icon: 'message', type: 'comment'}
        ],

        gobackTool: {name: '后退', icon: 'left', type: 'goback', disabled: true},

        links: [],

        activeNode: null
      }
    },

    created() {
      this.nodes = this.rootFlow.sub.nodes
      this.links = this.rootFlow.sub.links
      this.items = this.rootItems
      this.flowMap[this.rootFlow.id] = this.rootFlow
      this.flowHistory.push(this.rootFlow.id)

      this.tools = [this.gobackTool, ...this.tools]
    },

    watch: {
      flowIndex() {
        this.gobackTool.disabled = !(this.flowHistory.length > 1 && this.flowIndex > 0)
      }
    },

    methods: {
      toolClick(tool) {
        if (tool.type === 'goback') {
          this.flowIndex = this.flowIndex - 1
          const flowId = this.flowHistory[this.flowIndex]
          const flowData = this.flowMap[flowId]
          this.nodes = flowData.sub.nodes
          this.links = flowData.sub.links
          this.items = flowData.type === 'SubProcess' ? this.subItems : this.rootItems

          this.flowHistory.push(flowId)
        } else if (tool.type === 'forward') {

        } else if (tool.type === 'comment') {
          if (this.activeNode === null) {
            alert('请选择添加注释的节点')
          } else {
            this.addComment()
          }
        }
      },

      nodeClick(node) {
        this.activeNode = node
      },

      nodeCreate(node) {
        if (node.type === 'SubProcess') {
          node.w = 400
          node.h = 200
        }
      },

      nodeDblclick(node) {
        if (node.type === 'SubProcess') {
          this.nodes = node.sub.nodes
          this.links = node.sub.links
          this.items = this.subItems
          this.flowMap[node.id] = node
          this.flowHistory.push(node.id)
          this.flowIndex = this.flowHistory.length - 1
        }
      },

      addComment() {
        const id = 'node_' + uuid().replace(/-/g, '')
        this.nodes.push({
          id: id,
          x: this.activeNode.x + 150,
          y: this.activeNode.y - 60,
          w: 100,
          h: 40,
          name: '详细注释',
          type: 'TextAnnotation',
          icon: 'message'
        })

        this.links.push({
          id: 'link_' + uuid().replace(/-/g, ''),
          way: 'l',
          s: id,
          type: 'comment-link',
          t: this.activeNode.id
        })
      }
    }
  }
</script>

<style lang="less">
  @comment-color: #f8df98;

  #sflow-demo {
    .TextAnnotation {
      border-radius: 10px;
      background-color: @comment-color;
      box-shadow: 0 0 4px 0 lighten(@comment-color, 5%);

      &:hover {
        box-shadow: 0 4px 6px 0 lighten(@comment-color, 5%);
      }

      &.active {
        border-color: darken(@comment-color, 20%);
      }
    }

    .SubProcess {
      background: transparent;
      border-color: #8fd4ff;
    }

    .comment-link {
      stroke: darken(@comment-color, 20%);
      stroke-dasharray: 6;
      marker-end: none;
    }
  }
</style>
