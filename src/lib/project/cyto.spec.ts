import { getElements } from './cyto';
import type { GaryProject } from './project';

const specimen: GaryProject[] = [
  {
    root: {
      name: 'bortosky-com',
      version: '0.0.1',
      type: 'module',
      dependencies: {
        tbd: '0.0.0',
      },
      devDependencies: {
        soon: '^17.10.5',
      },
      nx: {},
    },
    projects: [],
  },
  {
    root: {
      name: 'district-map',
      version: '0.0.0',
      dependencies: {
        tbd: '0.0.0',
      },
      devDependencies: {
        soon: '^17.10.5',
      },
      workspaces: ['apps/web'],
    },
    projects: [
      {
        name: 'reader',
        projectType: 'application',
        tags: [],
      },
      {
        name: 'reader-e2e',
        implicitDependencies: ['reader'],
      },
      {
        name: 'shared',
        projectType: 'library',
        tags: [],
      },
      {
        name: 'svg',
        projectType: 'library',
        tags: [],
      },
      {
        name: 'web',
        version: '0.0.1',
        type: 'module',
        dependencies: {
          dep: '0',
        },
        devDependencies: {
          devdep: '0',
        },
        nx: {
          implicitDependencies: ['svg', 'shared'],
        },
      },
    ],
  },
];
describe('Cyto', () => {
  test('adds', async () => {
    expect(await getElements(specimen)).toMatchInlineSnapshot(`
      {
        "edges": [],
        "nodes": [
          {
            "classes": [
              "gbp",
            ],
            "data": {
              "id": "bortosky-com",
            },
          },
          {
            "classes": [
              "gbp",
            ],
            "data": {
              "id": "district-map",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "reader-e2e@district-map",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "reader@district-map",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "shared@district-map",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "svg@district-map",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "web@district-map",
            },
          },
        ],
      }
    `);
  });
});
