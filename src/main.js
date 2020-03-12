import 'core-js/stable'

if (process.env.VUE_APP_PROJECT === 'SITE') {
  import('./main-site')
} else if (process.env.VUE_APP_PROJECT === 'DEMO') {
  import('./main-demo')
} else if (process.env.VUE_APP_PROJECT === 'FLOW') {
  import('./main-flow')
}
