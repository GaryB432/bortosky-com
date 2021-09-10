type VCard = string[];

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

interface QROptions {
  src: string;
  from: string;
  caption: string;
}

export function addQR(options: QROptions, n = 0) {
  const qrs = document.querySelector<HTMLDivElement>('.qrs');

  if (qrs) {
    console.log(qrs);
  }

  const f = `<div class="qr">
  <img
    id="contact${n}"
    src="${options.src}"
    alt="contact"
    data-from="${options.from}"
  />
  <div class="caption">${options.caption}</div>
</div>`;

const d = new DocumentFragment();
const da = document.createElement('div');
da.classList.add('qr');
const img = document.createElement('img');
const cap = document.createElement('div');

da.appendChild(img);
da.appendChild(cap);
d.appendChild(da);




}

function main(e?: Event) {
  if (e) {
    console.log(e.eventPhase);
  }

  //   <img
  //   id="contact"
  //   class="qr"
  //   src="qr/minimal-a.png"
  //   alt="contact"
  //   data-href="https://www.qrcode-monkey.com/#"
  // />

  addQR({
    src: 'qr/minimal-a.png',
    from: 'https://www.qrcode-monkey.com/#',
    caption: 'here',
  });
  const qrimg = document.querySelector<HTMLImageElement>('#contact.qr-not');
  if (qrimg) {
    qrimg.src = getVCardUrl([
      'N:Gary Bortosky',
      'TEL:13146090415',
      'URL:bortosky.com/gary',
      'EMAIL:gary@bortosky.com',
    ]).toString();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
