import { createServer } from "http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const server = createServer();
const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

server.on("request", async (req, res) => {
  const url = req.url;
  let content;
  if (url === "/clock/index.html") {
    content = await readFile(join(dirPath,"./index.html"));
    res.setHeader("Content-Type","text/html; charset=utf-8");
  } else if (url === "/clock/index.css") {
    content = await readFile(join(dirPath, "./index.css"));

  } else if (url === "/clock/index.js") {
    content = await readFile(join(dirPath, "./index.js"));

  } else {
    content = "<h1>403 NOT FOUND</h1>";
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }
  
  res.end(content);
});

server.listen(8888, () => {});
