export const h = 5;

interface FullMoon {
  time: string;
  name: string;
}

const m: FullMoon[] = [
  { time: '20220118T005100Z', name: 'Wolf corrected' },
  { time: '20220216T115900Z', name: 'Snow' },
  { time: '20220318T032000Z', name: 'Worm' },
  { time: '20220416T145700Z', name: 'Pink' },
  { time: '20220516T121500Z', name: 'Flower' },
  { time: '20220614T075200Z', name: 'Strawberry' },
  { time: '20220713T143800Z', name: 'Buck' },
  { time: '20220811T213600Z', name: 'Sturgeon' },
  { time: '20220910T055800Z', name: 'Corn' },
  { time: '20221009T165400Z', name: "Hunter's" },
  { time: '20221108T060200Z', name: 'Beaver' },
  { time: '20221207T230900Z', name: 'Cold' },
];

function toISO(tmz: string): string {
  const f = [tmz.slice(0, 4), tmz.slice(4, 6), tmz.slice(6, 8)].join('-');
  const t = [tmz.slice(9, 11), tmz.slice(11, 13)].join(':');
  return `${f}T${t}Z`;
  // return '2022-01-18T00:51Z'; // 6:51 pm e.g. 18:51
}

for (const moon of m) {
  const d = new Date(toISO(moon.time));
  console.log(d);
}
