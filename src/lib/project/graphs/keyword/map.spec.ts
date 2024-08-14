import type { PackageJson } from "$lib/project/project";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { getKeywordMap } from "./map";

import axios from "axios";
import type { Mocked } from "vitest";

vitest.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

// describe('market', () => {
//   test('should work', async () => {
//     mockedAxios.get.mockResolvedValue({
//       status: 200,
//       data: {
//         data: {
//           currency: 'USD',
//           rates: { DEF: '0.1', GHI: '0.5', XYZ: '1' },
//         },
//       },
//     });
//     const r = await price('XYZ', 'DEF', 'GHI');
//     expect(r).toEqual({ DEF: 10, GHI: 2, XYZ: 1 });
//   });
// });

// {name:"apple",version:"0.0.0",description:"the apple project",keywords:["apple"]},
// {name:"chair",version:"0.0.0",description:"the chair project",keywords:["chair"]},
// {name:"table",version:"0.0.0",description:"the table project",keywords:["table"]},
// {name:"house",version:"0.0.0",description:"the house project",keywords:["house"]},
// {name:"stone",version:"0.0.0",description:"the stone project",keywords:["stone"]},
// {name:"field",version:"0.0.0",description:"the field project",keywords:["field"]},
// {name:"plant",version:"0.0.0",description:"the plant project",keywords:["plant"]},
// {name:"river",version:"0.0.0",description:"the river project",keywords:["river"]},

const pjs: PackageJson[] = [
  {
    name: "house",
    version: "0.0.0",
    description: "the house project",
    dependencies: {
      bathroom: "^0.0.0",
    },
    devDependencies: {
      kitchen: "^0.0.0",
    },
  },
  {
    name: "kitchen",
    version: "0.0.0",
    description: "the kitchen project",
    keywords: ["room", "cooking"],
  },
  {
    name: "bathroom",
    version: "0.0.0",
    description: "the bathroom project",
    keywords: ["room", "bathing"],
  },
];

describe("Map", () => {
  let kmap: Map<string, PackageJson[]>;
  beforeEach(async () => {
    kmap = await getKeywordMap(pjs);
  });
  test("getKeywordMap", () => {
    expect(kmap.get("room")?.map((f) => f.name)).toEqual([
      "kitchen",
      "bathroom",
    ]);
  });
});

const orderlyPackages: PackageJson[] = [
  {
    name: "apple",
    version: "0.0.0",
    description: "the apple project",
    keywords: ["experience", "dictionary"],
    dependencies: {
      chair: "^0.0.0",
      field: "^0.0.0",
      river: "^0.0.0",
      stone: "^0.0.0",
    },
    devDependencies: {
      apple: "^0.0.0",
      chair: "^0.0.0",
      house: "^0.0.0",
      plant: "^0.0.0",
      stone: "^0.0.0",
      table: "^0.0.0",
    },
  },
  {
    name: "chair",
    version: "0.0.0",
    description: "the chair project",
    keywords: ["restaurant", "photograph", "helicopter"],
    dependencies: {
      chair: "^0.0.0",
      field: "^0.0.0",
      stone: "^0.0.0",
      table: "^0.0.0",
    },
    devDependencies: {
      chair: "^0.0.0",
      stone: "^0.0.0",
    },
  },
  {
    name: "table",
    version: "0.0.0",
    description: "the table project",
    keywords: [],
    dependencies: {
      table: "^0.0.0",
    },
    devDependencies: {
      apple: "^0.0.0",
      plant: "^0.0.0",
      river: "^0.0.0",
      table: "^0.0.0",
    },
  },
  {
    name: "house",
    version: "0.0.0",
    description: "the house project",
    keywords: ["experience", "instrument", "helicopter", "dictionary"],
    dependencies: {
      apple: "^0.0.0",
      chair: "^0.0.0",
      river: "^0.0.0",
    },
    devDependencies: {
      apple: "^0.0.0",
      field: "^0.0.0",
      river: "^0.0.0",
      stone: "^0.0.0",
      table: "^0.0.0",
    },
  },
  {
    name: "stone",
    version: "0.0.0",
    description: "the stone project",
    keywords: ["helicopter"],
    dependencies: {
      apple: "^0.0.0",
      house: "^0.0.0",
      table: "^0.0.0",
    },
    devDependencies: {
      river: "^0.0.0",
      stone: "^0.0.0",
    },
  },
  {
    name: "field",
    version: "0.0.0",
    description: "the field project",
    keywords: ["dictionary", "helicopter", "restaurant"],
    dependencies: {
      chair: "^0.0.0",
      plant: "^0.0.0",
      river: "^0.0.0",
    },
    devDependencies: {
      river: "^0.0.0",
      stone: "^0.0.0",
    },
  },
  {
    name: "plant",
    version: "0.0.0",
    description: "the plant project",
    keywords: ["dictionary", "restaurant"],
    dependencies: {
      chair: "^0.0.0",
      river: "^0.0.0",
      stone: "^0.0.0",
    },
    devDependencies: {
      field: "^0.0.0",
      plant: "^0.0.0",
      table: "^0.0.0",
    },
  },
  {
    name: "river",
    version: "0.0.0",
    description: "the river project",
    keywords: ["photograph", "television", "experience"],
    dependencies: {
      house: "^0.0.0",
      plant: "^0.0.0",
      river: "^0.0.0",
      stone: "^0.0.0",
    },
    devDependencies: {
      chair: "^0.0.0",
      field: "^0.0.0",
      house: "^0.0.0",
      table: "^0.0.0",
    },
  },
];
