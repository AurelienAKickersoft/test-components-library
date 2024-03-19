import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  {libInjectCss} from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname,"lib/index.js"),
      name: "first-components-library",
      fileName: (format) =>`index.${format}.js`,
    }
  },
  rollupOptions:{
    external:["react", "react-dom"],
    input: Object.fromEntries(
        glob.sync('lib/**/*.{js,jsx}').map(file => [
            relative('lib',
                file.slice(0, file.length - extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
        ])
    ),
    output: {
      assetFileNames: 'asset/[name][extname]',
      entryFileNames: '[name].js',
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
    },
  },
  sourcemap: true,
  emptyOutDir:true,
  plugins: [react(), libInjectCss()],
})
