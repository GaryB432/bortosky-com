import { getVCardUrl } from './vcard';

interface QROptions {
  caption: string;
  from: string;
  src: string;
}

export const qrs: QROptions[] = [
  {
    src: 'qr/minimal-a.png',
    from: 'https://www.qrcode-monkey.com/#',
    caption: 'contact a',
  },
  {
    src: getVCardUrl([
      'N:Gary Bortosky',
      'TEL:13146090415',
      'URL:bortosky.com/gary',
      'EMAIL:gary@bortosky.com',
    ]).toString(),
    from: 'https://zxing.org',
    caption: 'contact b',
  },
  {
    src: 'qr/stlccc23.png',
    from: 'https://stlccc.org/user',
    caption: 'stlccc',
  },
];
