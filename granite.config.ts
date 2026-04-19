import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "name-chemistry-lab",
  brand: {
    displayName: "이름으로 보는 궁합",
    primaryColor: "#8E2DE2",
    icon: "https://static.toss.im/appsintoss/16823/352a6b3e-03cc-489f-8b63-3266096135cd.png",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite dev",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
