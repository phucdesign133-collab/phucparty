// file: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/phucparty/', // Dòng này là "chìa khóa" để app biết nó đang ở đâu
})