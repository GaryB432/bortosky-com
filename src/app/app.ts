interface FullMoon {
  time: string;
  name: string;
}

export const m: FullMoon[] = [
  { time: '20220118T005100Z', name: 'Wolf' },
  { time: '20220216T175900Z', name: 'Snow' },
  { time: '20220318T082000Z', name: 'Worm' },
  { time: '20220416T195700Z', name: 'Pink' },
  { time: '20220516T051500Z', name: 'Flower' },
  { time: '20220614T125200Z', name: 'Strawberry' },
  { time: '20220713T193800Z', name: 'Buck' },
  { time: '20220812T023600Z', name: 'Sturgeon' },
  { time: '20220910T105800Z', name: 'Corn' },
  { time: '20221009T215400Z', name: "Hunter's" },
  { time: '20221108T120200Z', name: 'Beaver' },
  { time: '20221208T050900Z', name: 'Cold' },
];

function kebabCase(s: string): string {
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_']+/g, '-')
    .toLowerCase();
}
function toVEVENT(moon: FullMoon): string[] {
  const m = toISO(moon.time);
  const d = new Date(m);
  const e = new Date(d.getTime() + 20 * 60 * 1000);

  const details = [
    `UID:FULL_${kebabCase(moon.name).toUpperCase()}_MOON@bortosky.com`,
    `DTSTAMP:${moon.time}`,
    `DTSTART:${moon.time}`,
    `WTF:${e.toLocaleString('UTC', {})}`,
    `DTEND:19970715T040000Z`,
    `SUMMARY:Full ${moon.name} Moon`,
  ];
  return [`BEGIN:VEVENT`, ...details, `END:VEVENT`];
}

function toISO(tmz: string): string {
  const d = [tmz.slice(0, 4), tmz.slice(4, 6), tmz.slice(6, 8)].join('-');
  const t = [tmz.slice(9, 11), tmz.slice(11, 13)].join(':');
  return `${d}T${t}Z`;
}

const df = m.map(toVEVENT).flat().join('\n');

console.log(df);
