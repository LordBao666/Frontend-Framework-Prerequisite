import { fileURLToPath } from "node:url";
import { writeFile, readFile } from "node:fs/promises";
import { dirname } from "node:path";

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);
const readFromFile = dirPath + "/score.txt";
const writeToFile = dirPath + "/score-ok.txt";

async function readAndWriteContent() {
  try {
    //read
    const readContent = await readFile(readFromFile, "utf-8");
    console.log("read succeed");

    //handle readContent
    const result = readContent
      .split(" ")
      .map((ele) => {
        return ele.replace("=", ": ");
      })
      .join("\n");

    //write
    await writeFile(writeToFile, result);
    console.log("write succeed");
  } catch (error) {
    console.error("error:", error);
  }
}

readAndWriteContent();
