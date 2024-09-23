import { readFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname} from "node:path";

//get path of the current file
const filePath = fileURLToPath(import.meta.url);
//get path of the folder which the file belongs to
const dirPath = dirname(filePath);

function readFilePromise(filePath) {
  return new Promise((resolve, rejcet) => {
    readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        rejcet(error);
      } else {
        resolve(data);
      }
    });
  });
}
let readContent;
const targetFile = dirPath + "/file1/1.txt";

async function readFileContent() {
  try {
    readContent = await readFilePromise(targetFile);
    console.log("file reading succeed");
  } catch (error) {
    console.log("file reading fail");
    console.log(error);
  }
}

async function printReadContent() {
  console.log(readContent);
}

async function main() {
  await readFileContent();
  await printReadContent();
}

main();
