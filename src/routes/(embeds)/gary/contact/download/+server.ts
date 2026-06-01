import type { RequestHandler } from "@sveltejs/kit";

import { VERCEL_VCARD_IV, VERCEL_VCARD_SECRET_KEY } from "$env/static/private";
import crypto from "node:crypto";

const currentTimestamp =
  new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

function requireEnv(value: unknown, name: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing or invalid env var: ${name}`);
  }
  return value;
}

export const GET: RequestHandler = () => {
  const otherInformation: string[] = [];
  try {
    const key = Buffer.from(
      requireEnv(VERCEL_VCARD_SECRET_KEY, "VERCEL_VCARD_SECRET_KEY"),
      "hex",
    );
    const iv = Buffer.from(
      requireEnv(VERCEL_VCARD_IV, "VERCEL_VCARD_IV"),
      "hex",
    );
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    const relativelySensitiveMaterial = JSON.parse(decrypted) as string[];
    otherInformation.push(...relativelySensitiveMaterial);
  } catch (e) {
    console.log(e);
  }

  const vCard: string[] = [
    "BEGIN:VCARD",
    "VERSION:4.0",
    ...baseVCard,
    ...otherInformation,
    "REV:".concat(currentTimestamp),
    "END:VCARD",
  ];

  return new Response(vCard.join("\r\n"), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Disposition": 'inline; filename="Gary_Bortosky.vcf"',
      "Content-Type": "text/vcard; charset=utf-8",
    },
  });
};

const baseVCard = [
  "KIND:individual",
  "UID:urn:uuid:40b266ed-bb65-4e17-82a5-787caa652260",
  "BIRTHPLACE:geo:38.586,-90.469",
  "FN:Gary Bortosky",
  "N:Bortosky;Gary;;;",
  "LANG;PREF=1:en",
  "TITLE:Enthused Hobbyist",
  "ROLE:Tool Making and Puttering",
  "URL;TYPE=work:https://www.bortosky.com/gary",
  "SOCIALPROFILE;TYPE=github:https://github.com/GaryB432",
  "TZ:America/Chicago",
];

const encryptedData = [
  "5bd95209f61b0649cdcabc4f490065087ebc77bfb6260550ce78e9787df9d65e1009a6b97362ffed99c6de840b0e076029674b2b5be22c03",
  "84bc84f6523426800fa5c9389cd11a3c7b69a98c49d13620a438e7d9551bbba5663d2c54f1dd68fc81b1419b3b1bc86edb2e2121ac017ef0",
  "9f086171bdcfdc6f6f3be6c4ecf899001cab6fa5c09b6903d9a29c63548f2a302ddf089064e89e6951b5403667e24224184fae132d4f4547",
  "ca987d54387d501856d530382bc44d3598870e57fc0273d17848cde73b6e826fc60fd66e00ea92b10947a3c2bf83fbbf5b6c366a61bae4d4",
  "0e756ef3555bffc55253faf59e2729d2f4b50c4deacd02cd8efc46387a67c49439b5d0daccb7030973f0eee2207543cfde0196b0f4796b37",
  "1b082766f262ce3837ecb185378e103c145ecac125282fa8abac93887e5c45bb4ff133e98695cd485e91ae45ef40403e31296d52f1210777",
].join("");
