import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "name-matching-app",
  brand: {
    displayName: "우리 사이 궁합은?",
    primaryColor: "#8E2DE2",
    icon: "",
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
