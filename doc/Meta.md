# vue-meta

[GitHub](https://github.com/nuxt/vue-meta)

```vue
<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App',
      titleTemplate: '%s - Yay!',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  }
</script>
```

```javascript
import VueMeta from 'vue-meta'

// 自定义meta
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
```