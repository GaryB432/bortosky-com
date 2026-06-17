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
    console.log("VCARD decryption is a bust");
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

const encryptedData = [
  "456bd0624e922224703e1344f02d0c110ee932ef16b77669d394664f69df48dfa2c3cfab740809ef0c056f910f614a64004a420947d54f82",
  "a7ec9fd322eb486f7763c3c703fc17d5b306974810934f4ce9c0f885e27e6b7ec4efa8240d44bc00d3c9f02efa45fa38416aa13226f42f12",
  "a36a90179c28b51c3a5afbd3f161c092ac3eb786120f9dc0aba20bf152cb10093bbeea868943216c2f2cfb6b729cda1830cec421411b45c3",
  "1f0e2668bbe032564c7f5ecec1ed699986d706d54c372906715b698c1d002b9a31492eda90516be51e5fae7472f1c086e2c4fd83446340dc",
  "6e486d0fc677a644114ae77583580c7dc927a915dfc1b4f8a95a671a7ed11a46903105e8438d4fe148ecbd458d8ec695c211de5a3c8617dd",
  "1bcb4fbf9a2ae61dde39c4edbab8e4842c62877e16fb3d6774250bdafbcf71016de07f88bb16481b2ed351a5e090290b66e76b667c7baa98",
].join("");
