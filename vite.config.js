import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import path from 'path';

export default defineConfig({
    plugins: [
        babel(),
    ],
    root: path.resolve(__dirname, 'fe-files'),
    build: {
      outDirb: '../dist'
    },
    server : {
      port : 3000,
      hot : true
    }
})