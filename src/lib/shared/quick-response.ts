import { getVCardUrl } from "./vcard";

interface QROptions {
  caption: string;
  from: string;
  src: string;
}

export const qrs: QROptions[] = [
  {
    caption: "contact a",
    from: "https://www.qrcode-monkey.com/#",
    src: "qr/minimal-a.png",
  },
  {
    caption: "contact b",
    from: "https://zxing.org",
    src: getVCardUrl([
      "N:Gary Bortosky",
      "TEL:13146090415",
      "URL:bortosky.com/gary",
      "EMAIL:gary@bortosky.com",
    ]).toString(),
  },
  {
    caption: "stlccc",
    from: "https://stlccc.org/user",
    src: "qr/stlccc23.png",
  },
];
