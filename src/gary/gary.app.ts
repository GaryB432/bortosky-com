type VCard = string[];

interface QROptions {
  caption: string;
  from: string;
  src: string;
}

export function getVCardUrl(vcard: VCard): URL {
  const chl = ['BEGIN:VCARD', 'VERSION:3.0', ...vcard, 'END:VCARD'].join('\n');

  const u = new URL('w/chart', 'https://zxing.org');
  u.searchParams.append('cht', 'qr');
  u.searchParams.append('chs', '350x350');
  u.searchParams.append('chld', 'L');
  u.searchParams.append('choe', 'UTF-8');
  u.searchParams.append('chl', chl);
  return u;
}

export function addQR(options: QROptions, n = 0): void {
  const qrs = document.querySelector<HTMLDivElement>('.qrs');

  if (qrs) {
    const f = new DocumentFragment();
    const dqr = document.createElement('div');
    dqr.classList.add('qr');
    const img = document.createElement('img');
    img.setAttribute('id', `contact${n}`);
    img.setAttribute('src', options.src);
    img.setAttribute('alt', `contact qr ${n}`);
    img.setAttribute('title', options.from);
    const cap = document.createElement('div');
    cap.classList.add('caption');
    cap.textContent = options.caption;

    dqr.appendChild(img);
    dqr.appendChild(cap);
    f.appendChild(dqr);
    qrs.appendChild(f);
  }
}

function main() {
  const qrs: QROptions[] = [
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
  ];
  qrs.forEach(addQR);
  const sorter = document.querySelector<HTMLTextAreaElement>(
    'section.sorter > textarea'
  );
  const button = document.querySelector<HTMLButtonElement>(
    'section.sorter > button'
  );
  if (sorter && button) {
    button.addEventListener('click', () => {
      sorter.value = sorter.value.split('\n').sort().join('\n');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
