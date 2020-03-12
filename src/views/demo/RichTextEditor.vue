<template>
  <div class="quill-warpper">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {Quill, quillEditor} from 'vue-quill-editor'

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
    ["blockquote", "code-block"], // 引用  代码块
    // [{ header: 1 }, { header: 2 }], // 1、2 级标题
    [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
    // [{ script: "sub" }, { script: "super" }], // 上标/下标
    [{indent: "-1"}, {indent: "+1"}], // 缩进
    [{size: ['9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72']}], // 字体大小
    [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
    [{color: []}, {background: []}], // 字体颜色、字体背景颜色
    [{font: ['微软雅黑', '宋体', '黑体', '冬青黑简体中文', 'Arial']}], // 字体种类
    [{align: []}], // 对齐方式
    ["clean"], // 清除文本格式
    ["link", "image", "video"] // 链接、图片、视频
  ]

  export default {
    data() {
      return {
        content: '<h2>欢迎使用富文编辑器</h2><p>请输入内容。。。</p>',
        editorOption: {
          modules: {
            toolbar: toolbarOptions,
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },

          }
        }
      }
    },

    components: {
      quillEditor
    },

    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },

    created() {
      const font = Quill.import('formats/font')
      font.whitelist = ['微软雅黑', '宋体', '黑体', '冬青黑简体中文', 'Arial']
      Quill.register(font, true)

      const size = Quill.import('formats/size')
      size.whitelist = ['9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72']
      Quill.register(size, true)
    },

    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style lang="less">
  .quill-warpper {
    .quill-editor {
      height: 30rem;
    }
  }

  .ql-snow .ql-picker.ql-font {
    width: 120px;
  }

  .quill-editor {
    .ql-font {
      .ql-picker-label {
        &[data-value]::before {
          content: attr(data-value);
        }
      }

      .ql-picker-options {
        span[data-value]::before {
          content: attr(data-value);
        }
      }
    }

    .ql-size {
      .ql-picker-label {
        &[data-value]::before {
          content: attr(data-value);
        }
      }

      .ql-picker-options {
        span[data-value]::before {
          content: attr(data-value);
        }
      }
    }
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:" !important;
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0;
    content: '保存' !important;
    padding-right: 0;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6' !important;
  }

  .ql-font-宋体 {
    font-family: SimSun, "Songti SC", sans-serif;
  }

  .ql-font-微软雅黑 {
    font-family: "Microsoft YaHei", sans-serif;
  }

  .ql-font-冬青黑简体中文 {
    font-family: "Hiragino Sans GB", sans-serif;
  }

  .ql-font-黑体 {
    font-family: SimHei, "Heiti SC", sans-serif;
  }

  .ql-font-Arial {
    font-family: Arial, sans-serif;
  }

  .ql-size-9 {
    font-size: 9px;
  }

  .ql-size-10 {
    font-size: 10px;
  }

  .ql-size-11 {
    font-size: 11px;
  }

  .ql-size-12 {
    font-size: 12px;
  }

  .ql-size-14 {
    font-size: 14px;
  }

  .ql-size-16 {
    font-size: 16px;
  }

  .ql-size-18 {
    font-size: 18px;
  }

  .ql-size-20 {
    font-size: 20px;
  }

  .ql-size-22 {
    font-size: 22px;
  }

  .ql-size-24 {
    font-size: 24px;
  }

  .ql-size-26 {
    font-size: 26px;
  }

  .ql-size-28 {
    font-size: 28px;
  }

  .ql-size-36 {
    font-size: 36px;
  }

  .ql-size-48 {
    font-size: 48px;
  }

  .ql-size-72 {
    font-size: 72px;
  }
</style>