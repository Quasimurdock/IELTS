const fs = require("fs");
const readline = require("readline");
const regex = /\b[a-zA-Z]+(?:-[a-zA-Z]+)?\b/;

const inputFilePath = "IELTS Word List.txt";
const outputFilePath = "output.txt";

const input = fs.createReadStream(inputFilePath);
const output = fs.createWriteStream(outputFilePath);

const rl = readline.createInterface({
  input: input,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  // 判断是否为空白行
  if (line.trim().length === 0) {
    return;
  }

  // 判断是否包含词组"Word List"
  if (line.includes("Word List")) {
    return;
  }

  const match = line.match(regex);
  if (match && match.length > 0) {
    const word = match[0];

    // 判断首字符是否为字母
    if (!isLetter(word[0])) {
      return;
    }

    output.write(`${word}\n`);
  }
});

rl.on("close", function () {
  console.log("处理完成");
});

// 判断字符是否为字母
function isLetter(char) {
  return /[a-zA-Z]/.test(char);
}
