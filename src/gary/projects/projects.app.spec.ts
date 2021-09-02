import { Report } from '../../app/types';
import { find } from './projects.app';

const reports: Report[] = [
  // {
  //   plat: 'test/plat',
  //   path: 'tbd-1',
  //   json: {
  //     name: 'tbd-1-package',
  //     dependencies: { apple: 'NA', banana: 'NA' },
  //     devDependencies: { cherry: 'NA' },
  //   },
  //   features: {
  //     management: {
  //       nx: false,
  //       lerna: false,
  //       rush: false,
  //     },
  //     devOps: {
  //       azure: false,
  //       github: false,
  //     },
  //     rxjs: false,
  //     angular: false,
  //     devkit: false,
  //     webpack: false,
  //   },
  //   monorepo: [],
  // },
  {
    plat: 'test/plat',
    path: 'tbd-2',
    json: {
      name: 'tbd-2-package',
      dependencies: { dandelion: 'NA', elephant: 'NA' },
      devDependencies: { fox: 'NA' },
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
      rxjs: false,
      angular: false,
      devkit: false,
      webpack: false,
    },
    monorepo: [],
  },
];

describe('projects', () => {
  it('finds', () => {
    expect(find('notfound', reports).map((r) => r.path)).toEqual([]);
  });
  it('finds', () => {
    expect(find('elephant', reports).map((r) => r.path)).toEqual(['tbd-2']);
  });
});
