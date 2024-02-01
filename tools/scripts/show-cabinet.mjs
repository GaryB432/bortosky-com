import chalk from "chalk";
import { readFile } from "fs/promises";
import { argv } from "process";

const fileName = argv[2] ?? "./static/cabinet/demo.json";
const { log } = console;
const unlabeled = "unlabeled";

/**
 * @param {string|undefined} isoDate
 * @returns string
 */
function dateString(isoDate) {
  return isoDate ? `${isoDate.slice(5)}-${isoDate.slice(0, 4)}` : "undated";
}

/**
 * @param {import('../cabinet').Document} doc
 * @returns void
 */
function showDoc(doc) {
  log(
    `- ${chalk.whiteBright(doc.subject || "UNSUB")} ${chalk.blue(
      dateString(doc.date),
    )}`,
  );
}

readFile(fileName).then(
  (buffer) => {
    /** @type {import('../cabinet').HttpsBortoskyComCabinetSchemaJson} */
    const c = JSON.parse(buffer.toString());
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
