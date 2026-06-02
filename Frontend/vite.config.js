import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Milk Tracker",
        short_name: "MilkTracker",
        description:
          "Track daily milk attendance and monthly bills",

        theme_color: "#2563eb",
        background_color: "#ffffff",

        display: "standalone",

        icons: [
          {
            src: "iamge.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "image.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});