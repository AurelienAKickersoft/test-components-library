import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname,"src/index.js"),
      name: "first-components-library",
      fileName: (format) =>`index.${format}.js`,
    }
  },
  rollupOptions:{
    external:["react", "react-dom"],
    output: {
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      },
    },
  },
  sourcemap: true,
  emptyOutDir:true,
  plugins: [react()],
})
