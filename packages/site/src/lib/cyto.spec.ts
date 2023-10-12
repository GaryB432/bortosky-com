import { describe, expect, test } from 'vitest';
import { toElementsDefinition, type PackageConfiguration } from './cyto';

const anotherP: PackageConfiguration = {
  features: {
    angular: false,
    devOps: {
      azure: undefined,
      github: undefined,
    },
    devkit: false,
    management: {
      lerna: undefined,
      nx: undefined,
      rush: undefined,
    },
    rxjs: false,
    webpack: false,
  },
  json: {
    name: 'another-p',
    version: '0',
    devDependencies: {
      '@types/jest': '^22.2.2',
      '@types/node': '^9.6.1',
      'copy-webpack-plugin': '^4.5.1',
      coveralls: '^3.0.0',
    },
    dependencies: {
      express: '^4.16.3',
      tslib: '^1.9.0',
    },
  },
  monorepo: [],
  path: '',
};

const yoroy: PackageConfiguration = {
  path: 'yoroy-pwa',
  json: {
    name: 'yoroy-pwa',
    description: 'PWA game for testing cyto!',
    version: '1.0.0',
    repository: {
      type: 'git',
      url: 'git+https://github.com/garyb432/yoroy-pwa.git',
    },
    keywords: [
      'word',
      'game',
      'pwa',
      'workbox',
      'service',
      'worker',
      'typescript',
    ],
    license: 'ISC',
    // bugs: {
    //   url: 'https://github.com/garyb432/yoroy-pwa/issues',
    // },
    homepage: 'https://github.com/garyb432/yoroy-pwa#readme',
    devDependencies: {
      '@types/jest': '^22.2.2',
      '@types/node': '^9.6.1',
      'copy-webpack-plugin': '^4.5.1',
      coveralls: '^3.0.0',
    },
    dependencies: {
      express: '^4.16.3',
      tslib: '^1.9.0',
    },
  },
  features: {
    management: {
      nx: false,
      lerna: false,
      rush: false,
    },
    devOps: {
      azure: false,
      github: false,
    },
    angular: false,
    rxjs: false,
    devkit: false,
    webpack: true,
  },
  monorepo: [],
};

const ts = `
{
  "edges": [],
  "nodes": [
    {
      "data": {
        "features": {
          "angular": false,
          "devOps": {
            "azure": false,
            "github": false,
          },
          "devkit": false,
          "management": {
            "lerna": false,
            "nx": false,
            "rush": false,
          },
          "rxjs": false,
          "webpack": true,
        },
        "id": "yoroy-pwa",
        "path": "yoroy-pwa",
      },
    },
  ],
}
`;

describe('Cyto', () => {
  test('toElementsDefinition', () => {
    const p = [];
    const eles = toElementsDefinition([yoroy, anotherP]);
    expect(eles.nodes.map((e) => e.data.id)).toEqual([
      '@types/jest',
      '@types/node',
      'another-p',
      'copy-webpack-plugin',
      'coveralls',
      'express',
      'tslib',
      'yoroy-pwa',
    ]);
    expect(eles.edges[0]).toEqual({
      data: {
        dev: true,
        id: '@types/jest_another-p',
        source: 'another-p',
        target: '@types/jest',
      },
    });
    // expect(eles).toMatchInlineSnapshot(`
    //   {
    //     "nodes": [
    //       {
    //         "data": {
    //           "data": {
    //             "id": "yoroy-pwa",
    //             "root": true,
    //           },
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "dev": false,
    //             "id": "express",
    //           },
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "dev": false,
    //             "id": "tslib",
    //           },
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "id": "another-p",
    //             "root": true,
    //           },
    //         },
    //       },
    //     ],
    //     "edges": [
    //       {
    //         "data": {
    //           "data": {
    //             "id": "express_yoroy-pwa",
    //           },
    //           "source": "yoroy-pwa",
    //           "target": "express",
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "id": "tslib_yoroy-pwa",
    //           },
    //           "source": "yoroy-pwa",
    //           "target": "tslib",
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "id": "express_another-p",
    //           },
    //           "source": "another-p",
    //           "target": "express",
    //         },
    //       },
    //       {
    //         "data": {
    //           "data": {
    //             "id": "tslib_another-p",
    //           },
    //           "source": "another-p",
    //           "target": "tslib",
    //         },
    //       },
    //     ],
    //   }
    // `);
  });
});
