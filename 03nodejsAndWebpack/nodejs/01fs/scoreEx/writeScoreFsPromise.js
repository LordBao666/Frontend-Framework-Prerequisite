import { fileURLToPath } from "node:url";
import { writeFile, readFile } from "node:fs/promises";
import { dirname } from "node:path";

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

async function readAndWritescore() {
  let readContent;
  try {
    const res = await readFile(`${dirPath}/score.txt`, "utf-8");
    readContent = res
      .split(" ")
      .map((ele) => {
        return ele.replace("=", ": ");
      })
      .join("\n");
    console.log("read succeeds");

  } catch (error) {
    console.log("read fails.....");
    console.log(error);
    return;
  }

  try {
    await writeFile(`${dirPath}/score-ok.txt`, readContent);
    console.log("write succeeds");
  } catch (error) {
    console.log("write fails---");
    console.log(error);
  }
}

readAndWritescore();
