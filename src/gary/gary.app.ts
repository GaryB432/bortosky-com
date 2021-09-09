function getVCardUrl(): URL {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Gary Bortosky',
    'TEL:13146090415',
    'URL:bortosky.com/gary',
    'EMAIL:gary@bortosky.com',
    'END:VCARD',
  ];

  const chl = vcard.join('\n');

  const u = new URL('w/chart', 'https://zxing.org');
  u.searchParams.append('cht', 'qr');
  u.searchParams.append('chs', '350x350');
  u.searchParams.append('chld', 'L');
  u.searchParams.append('choe', 'UTF-8');
  u.searchParams.append('chl', chl);
  return u;
}

function afterDOMLoaded() {
  const qrimg = document.querySelector<HTMLImageElement>('#contact.qr');
  if (qrimg) {
    qrimg.src = getVCardUrl().toString();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

export {};
