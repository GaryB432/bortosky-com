import { sveltekit } from "@sveltejs/kit/vite";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    coverage: {
      exclude: [
        "**/*.config.{js,ts}",
        "**/*.{svelte,svelte.{js,ts}}",
        "build/**",
        "src/routes/**",
        "tools/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
