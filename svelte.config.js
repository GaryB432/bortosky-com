import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const calMonths = [
  '2022-05',
  '2022-06',
  '2022-07',
  '2022-08',
  '2022-09',
  '2022-10',
  '2022-11',
  '2022-12',
  '2023-01',
  '2023-02',
  '2023-03',
  '2023-04',
].map((d) => `/calendar/year/${d}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],

  kit: {
    adapter: adapter(),
    prerender: { default: true, entries: ['*', ...calMonths] },
    paths: {
      base: ''
    },
    appDir: 'internal',
    methodOverride: {
      allowed: ['PATCH', 'DELETE'],
    },

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/variables.scss" as *;',
          },
        },
      },
    },
  },
};

export default config;
