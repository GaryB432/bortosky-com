import { GDate } from './gdate';

interface FullMoon {
  name: string;
  time: string;
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

function uid(s: string): string {
  return s.replace(/[\s-\']+/g, '_').toUpperCase();
}

function toVEVENT(moon: FullMoon): string[] {
  const gd = GDate.create(moon.time);

  const details = [
    `UID:2022_${uid(moon.name)}_MOON@bortosky.com`,
    `DTSTAMP:${new GDate(2022, 1, 5, 9, 0)}`,
    `DTSTART:${gd}`,
    `DTEND:${gd.addMinutes(30)}`,
    `SUMMARY:Full ${moon.name} Moon`,
  ];
  return [`BEGIN:VEVENT`, ...details, `END:VEVENT`];
}

const df = m.map(toVEVENT).flat().join('\n');

console.log(df);
