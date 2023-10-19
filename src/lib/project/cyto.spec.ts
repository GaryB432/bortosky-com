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
        "edges": [
          {
            "classes": "psub",
            "data": {
              "id": "district-map#reader-district-map",
              "source": "district-map",
              "target": "district-map#reader",
            },
          },
          {
            "classes": "psub",
            "data": {
              "id": "district-map#reader-e2e-district-map",
              "source": "district-map",
              "target": "district-map#reader-e2e",
            },
          },
          {
            "classes": "psub",
            "data": {
              "id": "district-map#shared-district-map",
              "source": "district-map",
              "target": "district-map#shared",
            },
          },
          {
            "classes": "psub",
            "data": {
              "id": "district-map#svg-district-map",
              "source": "district-map",
              "target": "district-map#svg",
            },
          },
          {
            "classes": "psub",
            "data": {
              "id": "district-map#web-district-map",
              "source": "district-map",
              "target": "district-map#web",
            },
          },
        ],
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
              "id": "district-map#reader",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "district-map#reader-e2e",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "district-map#shared",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "district-map#svg",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "district-map#web",
            },
          },
        ],
      }
    `);
  });
});
