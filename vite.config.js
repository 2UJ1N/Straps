import { SourceMap } from 'module'

const path = require('path')

export default {
  root: path.resolve(__dirname, 'fe-files'),
  build: {
    outDir: '../dist',
    SourceMap : true
  },
  server: {
    port: 3000,
    hot: true
  }
}