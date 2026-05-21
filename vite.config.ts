import { coverageConfigDefaults, defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "client",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium", headless: true }],
          },
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
        },
      },

      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
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
