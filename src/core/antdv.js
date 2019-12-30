// 按需加载 ant-design-vue 原生组件
import Vue from 'vue'
import {
  Button,
  Radio,
  Checkbox,
  Select,
  Form,
  Modal,
  Table,
  Tree,
  TreeSelect,
  Tabs,
  Icon,
  Menu,
  Upload,
  Skeleton,
  message,
  notification
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Form)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tree)
Vue.use(TreeSelect)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Upload)
Vue.use(Skeleton)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
