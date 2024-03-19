import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  {libInjectCss} from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      formats: ['es']
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
          glob.sync('lib/**/*.{js,jsx}',{ ignore: 'lib/**/*.stories.jsx'}).map(file => [
            relative('lib',
                file.slice(0, file.length - extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ),
      output: {
        assetFileNames: 'asset/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [react(), libInjectCss()],
})
