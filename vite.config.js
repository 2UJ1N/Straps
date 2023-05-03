const path = require('path')

export default {
  root: path.resolve(__dirname, 'fe-files'),
  build: {
    outDir: '../dist',
    SourceMap : true
  },
  server: {
    port: 3001,
    hot: true
  }
}