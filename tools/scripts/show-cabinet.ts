import chalk from "chalk";
import { readFile } from "fs/promises";
import { argv } from "process";
import type {
  HttpsBortoskyComCabinetSchemaJson as Cabinet,
  Document as Doc,
} from "../cabinet";

const fileName = argv[2] ?? "./static/cabinet/demo.json";
const { log } = console;
const unlabeled = "unlabeled";

function dateString(isoDate: string | undefined): string {
  return isoDate ? `${isoDate.slice(5)}-${isoDate.slice(0, 4)}` : "undated";
}

function showDoc(doc: Doc) {
  log(
    `- ${chalk.whiteBright(doc.subject || "UNSUB")} ${chalk.blue(
      dateString(doc.date),
    )}`,
  );
}

readFile(fileName).then(
  (buffer: Buffer) => {
    const c = JSON.parse(buffer.toString()) as Cabinet;
    if (c.hangingFolders) {
      c.hangingFolders.forEach((hf, i) => {
        log(
          chalk.greenBright(
            `## Hanging Folder (${i})  [${hf.id ?? unlabeled}]`,
          ),
        );
        if (hf.content) {
          for (const hfc of hf.content) {
            if ("folder" in hfc) {
              if (hfc.folder) {
                if (typeof hfc.folder === "string") {
                  log(`${chalk.white("###")} ${chalk.yellow(hfc.folder)}`);
                } else {
                  for (const hfcfc of hfc.folder.content || []) {
                    showDoc(hfcfc);
                  }
                }
              }
            } else if ("subject" in hfc) {
              showDoc(hfc);
            } else {
              throw new Error("wtf");
            }
          }
        }
      });
    }
  },
  (e) => log(e),
);
