import {join,basename,extname,dirname} from "path"
import { fileURLToPath } from "url"

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

const targetPath = join(dirPath,"../../../README.md");

console.log(targetPath);

console.log(basename(targetPath)) //README.md
console.log(basename(targetPath,".md")) //README
console.log(extname(targetPath)) //.md



