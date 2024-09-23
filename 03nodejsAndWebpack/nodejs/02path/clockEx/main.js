import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

//匹配<style></style>标签的正则表达式
// 其中\s表示空白字符；\S表示非空白字符； *表示匹任次
const regstyle = /<style>[\s\S]*<\/style>/;
//匹配<script></script>标签的正则表达式
const regscript = /<script>[\s\S]*<\/script>/;

/**
 *
 * @param {string} html 待处理的html
 * @param {string} path CSS最终的存储路径
 */
async function resolveCSS(html, path) {
  //如果正则表达式匹配成功，exec返回的数组arr中的arr[0]即为匹配文本
  const arr = regstyle.exec(html);
  const data = arr[0].replace("<style>", "").replace("</style>", "");
  await writeFile(path, data);
  console.log("CSS write success");
}
/**
 *
 * @param {string} html 待处理的html
 * @param {string} path JavaScript最终的存储路径
 */
async function resolveJavaScript(html, path) {
  //如果正则表达式匹配成功，exec返回的数组arr中的arr[0]即为匹配文本
  const arr = regscript.exec(html);
  const data = arr[0].replace("<script>", "").replace("</script>", "");
  await writeFile(path, data);
  console.log("JavaScript write success");
}

/**
 *
 * @param {string} html 待处理的html
 * @param {string} path 去除掉CSS,JavaScript 之后的HTML最终的存储路径
 */
async function resolveHTML(html, path) {
  const newHtml = html
    .replace(regstyle, '<link rel="stylesheet" href="./index.css"> ')
    .replace(regscript, '<script src="./index.js"></script>');

  await writeFile(path,newHtml);
  console.log("HTML write success");
}

(async () => {
  const html = await readFile(join(dirPath, "./index.html"), "utf-8");

  resolveCSS(html, join(dirPath, "./clock/index.css"));
  resolveJavaScript(html, join(dirPath, "./clock/index.js"));
  resolveHTML(html, join(dirPath, "./clock/index.html"));
})();
