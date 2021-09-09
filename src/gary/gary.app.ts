async function main(): Promise<void> {
  const c = document.querySelector<HTMLImageElement>('#contact.qr');

  // https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AGary+Bortosky%0ATEL%3A13146090415%0AURL%3Abortosky.com%2Fgary%0AEMAIL%3Agary%40bortosky.com%0AEND%3AVCARD
  if (!c) return;

  const vcardgary = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Gary Bortosky',
    'N:Bortosky;Gary;;;',
    'EMAIL;TYPE=INTERNET:garybort@gmail.com',
    'EMAIL;TYPE=INTERNET:gary@bortosky.com',
    'item1.EMAIL;TYPE=INTERNET:bort1959@hotmail.com',
    'item1.X-ABLabel:',
    'TEL;TYPE=CELL:314-609-0415',
    'ADR;TYPE=HOME:;;16 Meadow Lake Dr;St. Louis;MO;63146-5468;US;16 Meadow Lake',
    '  Dr\nSt. Louis, MO 63146-5468\nUS',
    'BDAY:19590520',
    'item2.URL:https://bortosky.com/gary',
    'item2.X-ABLabel:PROFILE',
    'PHOTO:https://lh3.googleusercontent.com/-dEotrpOZMgo/VVUrXqiXjiI/AAAAAAAAAA',
    ' A/ms5Cks0eTfA9kEpHHcxmrwCV2eUCw9ePgCOQCEAE/photo.jpg',
    'CATEGORIES:myContacts',
    'END:VCARD',
  ];

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Gary Bortosky',
    'TEL:13146090415',
    'URL:bortosky.com/gary',
    'EMAIL:gary@bortosky.com',
    'END:VCARD',
  ];

  const chlold =
    'BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AGary+Bortosky%0ATEL%3A13146090415%0AURL%3Abortosky.com%2Fgary%0AEMAIL%3Agary%40bortosky.com%0AEND%3AVCARD';

  const chlsave =
    'BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AGary%2BBortosky%0ATEL%3A13146090415%0AURL%3Abortosky.com%2Fgary%0AEMAIL%3Agary%40bortosky.com%0AEND%3AVCARD';

  // const chl = encodeURIComponent(vcard.join('\n'));
  const chl = vcard.join('\n');

  console.log(c.src);
  const u = new URL('w/chart', 'https://zxing.org');
  u.searchParams.append('cht', 'qr');
  u.searchParams.append('chs', '350x350');
  u.searchParams.append('chld', 'L');
  u.searchParams.append('choe', 'UTF-8');
  u.searchParams.append('chl', chl);
  console.log(u.searchParams.toString());
  c.src = u.toString();
}

main();

export {};
