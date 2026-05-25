import type { RequestHandler } from '@sveltejs/kit';

const baseVCard = [
  'BEGIN:VCARD',
  'VERSION:4.0',
  'FN:Gary Bortosky',
  'N:Bortosky;Gary;;;',
  'ORG:Bortosky.com',
  'TITLE:Creative Technologist',
  'EMAIL;type=INTERNET;type=WORK:gary@bortosky.com',
  'TEL;type=CELL;type=VOICE;type=pref:+1-555-555-5555',
  'URL:https://bortosky.com',
  'ADR;type=WORK:;;123 Main St;Anytown;CA;12345;USA',
];

function isIOS(userAgent: string) {
  return /iPhone|iPad|iPod/i.test(userAgent);
}
function isAndroid(userAgent: string) {
  return /Android/i.test(userAgent);
}

export const GET: RequestHandler = async ({ request }) => {
  const userAgent = request.headers.get('user-agent') || '';
  const vCard: string[] = [...baseVCard];

  if (isIOS(userAgent)) {
    vCard.push('X-ABLabel:_Custom Home Address');
    vCard.push('X-ABRELATEDNAMES;TYPE=Assistant:Jane Doe');
  } else if (isAndroid(userAgent)) {
    vCard.push('NOTE:Custom Home Address: 123 Main St, Anytown, CA');
    vCard.push('NOTE:Assistant: Jane Doe');
  }

  vCard.push('END:VCARD');
  const payload = vCard.join('\r\n');

  return new Response(payload, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="Gary_Bortosky.vcf"',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    }
  });
};
