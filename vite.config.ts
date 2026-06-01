import { sveltekit } from "@sveltejs/kit/vite";
import { playwright } from "@vitest/browser-playwright";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
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
    expect: { requireAssertions: true },
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          browser: {
            enabled: true,
            instances: [{ browser: "chromium", headless: true }],
            provider: playwright(),
          },
          exclude: ["src/lib/server/**"],
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          name: "client",
        },
      },

      {
        extends: "./vite.config.ts",
        test: {
          environment: "node",
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          include: ["src/**/*.{test,spec}.{js,ts}"],
          name: "server",
        },
      },
    ],
  },
});

// import { sveltekit } from "@sveltejs/kit/vite";
// import { coverageConfigDefaults, defineConfig } from "vitest/config";

// export default defineConfig({
//   plugins: [sveltekit()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         api: "modern",
//       },
//     },
//   },
//   test: {
//     include: ["src/**/*.{test,spec}.{js,ts}"],
//     coverage: {
//       exclude: [
//         "**/*.config.{js,ts}",
//         "**/*.{svelte,svelte.{js,ts}}",
//         "build/**",
//         "src/routes/**",
//         "tools/**",
//         ...coverageConfigDefaults.exclude,
//       ],
//     },
//   },
// });
