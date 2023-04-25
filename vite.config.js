const path = require('path')

export default {
  root: path.resolve(__dirname, 'fe-files'),
  build: {
    outDir: '../dist'
  },
  server: {
    port: 12345,
    hot: true
  }
}