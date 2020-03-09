// 按需加载 ant-design-vue 原生组件
import Vue from 'vue'
import 'ant-design-vue/dist/antd.less'
import {
  Button,
  Select,
  Form,
  Modal,
  Table,
  Tag,
  Tree,
  Icon,
  Input,
  Row,
  Col,
  message,
  notification
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
