import { fileURLToPath } from "node:url";
import { writeFile, readFile } from "node:fs";
import { dirname } from "node:path";


const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

const p = new Promise((resolve, reject) => {
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
      
      resolve(res);
    }
  });
});

p.then((readContent) => {
  writeFile(`${dirPath}/score-ok.txt`, readContent, (error) => {
    if (error) {
      console.log("write fails---");
      console.log(error);
    } else {
      console.log("write succeeds");
    }
  });
}).catch((error) => {
  console.log(error);
});




