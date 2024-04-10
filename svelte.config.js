import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({ runtime: "nodejs21.x" }),
    // paths: {
    //   base: process.env.NODE_ENV === "production" ? "/GaryB432" : "",
    // },
  },
};

export default config;
