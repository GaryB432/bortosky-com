import { readFile } from 'fs/promises';
import { argv } from 'process';
import { Schema as Cabinet } from '../cabinet';
import { Chalk } from './chalk';

const fileName = argv[2] ?? 'assets/cabinet/demo.json';
const { log } = console;
const unlabeled = 'unlabeled';

readFile(fileName).then(
  (buffer: Buffer) => {
    const chalk = new Chalk();
    const c = JSON.parse(buffer.toString()) as Cabinet;
    if (c.hangingFolders) {
      c.hangingFolders.forEach((hf, i) => {
        log(
          chalk.greenBright(`## Hanging Folder (${i})  [${hf.id ?? unlabeled}]`)
        );
        if (hf.content) {
          hf.content.forEach((c) => {
            const label = (s: string) =>
              `${chalk.white('###')} ${chalk.yellow(s)}`;
            if (typeof c.folder === 'string') {
              log(label(c.folder));
            } else {
              if (c.folder.content) {
                log(label(c.folder.description ?? unlabeled));
                for (const doc of c.folder.content) {
                  if (typeof doc === 'string') {
                    log(label(doc));
                  } else {
                    log(chalk.white(`- ${doc.description}`));
                  }
                }
              }
            }
          });
        }
      });
    }
  },
  (e) => log(e)
);
