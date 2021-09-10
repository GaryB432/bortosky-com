import { getVCardUrl } from './gary.app';
const c = [
  'N:Gary Bortosky',
  'TEL:13146090415',
  'URL:bortosky.com/gary',
  'EMAIL:gary@bortosky.com',
];
test('getsVCardUrl', () => {
  const chl =
    'BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AGary+Bortosky%0ATEL%3A13146090415%0AURL%3Abortosky.com%2Fgary%0AEMAIL%3Agary%40bortosky.com%0AEND%3AVCARD';
  const vs = `https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=${chl}`;
  expect(getVCardUrl(c).toString()).toEqual(vs);
});

export {};
