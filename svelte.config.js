import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter(),
    // paths: {
    //   base: process.env.NODE_ENV === "production" ? "/GaryB432" : "",
    // },
  },

  preprocess: [vitePreprocess()],
};

export default config;
