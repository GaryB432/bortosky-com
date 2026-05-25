import { VERCEL_VCARD_IV, VERCEL_VCARD_SECRET_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";
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
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="Gary_Bortosky.vcf"',
      "Cache-Control": "no-store, no-cache, must-revalidate",
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

const encryptedData =
  "96aee23300650601016db6d3f1febb3de6beb193386f5fc8438f3324fdadc212b280cdff50c9a2841283" +
  "f330e023490b2978d0ce6c06bdbf1afbd06c29a29853c2d8ed3859f792b4e976eb4e9de3a893728e6ca3" +
  "9eb90203dc66d0336efcdada228b5d80e0260795767df5e39383ff7197a5f3bff04d79f3f3b6bc45e970" +
  "2919c561fcfaba8590a8effb529700b134c11f8836a57e8bf92db8c65709029eda0607a786c9ae5a39c4" +
  "19eb941cf967c0a1c8f6a51142c9099a68d803d5839743180fc4f887f55d35f0c879aa1b4c8f366bf868" +
  "0fdd5f8354e2ce3c9590d9933e4255cc37ce1e2bfed2d638c6417bd2690f1b1fc9b6d38038982839a136" +
  "c19bc966bf1a5f8780dbb702ceaf67b5b6c8c15ac469f04ad1ce5bae49a90df9539ab2799d2e9e06a23b" +
  "c22a99c96fdc8c46e088ab277d3751e5c5ce14a1d3924ac45d6402e263d9ad794421fa8b5737ef6e479a";
