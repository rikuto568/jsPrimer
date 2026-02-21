import * as util from "node:util";
import * as fs from "node:fs/promises";
import { marked } from "marked";

const { values, positionals } = util.parseArgs({
  allowPositionals: true,
  options: {
    gfm: {
      type: "boolean",
      default: false,
    },
  },
});
const filePath = positionals[0];
// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" })
  .then((file) => {
    const html = marked.parse(file, {
      gfm: values.jfm,
    });
    console.log(html);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
