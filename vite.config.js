import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/phucparty/",
  publicDir: "public", // Ép buộc lấy folder này để copy vào root của dist
  build: {
    outDir: "dist",
    emptyOutDir: true, // Xóa sạch dist cũ trước khi build mới
  },
});
