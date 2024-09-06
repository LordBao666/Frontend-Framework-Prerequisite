import { fileURLToPath } from "node:url";
import { writeFile, readFile } from "node:fs";
import { dirname } from "node:path";

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

async function readAndWritescore() {
  let readContent;
  try {
    readContent = await new Promise((resolve, reject) => {
      readFile(`${dirPath}/score.txt`, "utf-8", (error, data) => {
        if (error) {
          reject(error);
        } else {
          const res = data
            .split(" ")
            .map((ele) => {
              return ele.replace("=", ": ");
            })
            .join("\n");
          console.log("read succeeds");
          resolve(res);
        }
      });
    });
  } catch (error) {
    console.log("read fails.....");
    console.log(error);
    return;
  }

  writeFile(`${dirPath}/score-ok.txt`, readContent, (error) => {
    if (error) {
      console.log("write fails---");
      console.log(error);
    } else {
      console.log("write succeeds");
    }
  });
}

readAndWritescore();
