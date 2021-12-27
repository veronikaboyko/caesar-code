let fs = require("fs");
let { encrypt } = require("./encrypt");
let { decrypt } = require("./decrypt");
let args = process.argv;

if (args[2] === "code") {
  let shift = args[5];
  let input = fs.readFileSync(args[3], "utf-8");
  let result = encrypt(input, shift);
  fs.writeFileSync(args[4], result); 
}

else if (args[2] === "decode") {
  let input = fs.readFileSync(args[3], "utf-8");
  let result = decrypt(input);
  fs.writeFileSync(args[4], result[1]);
  console.log(`best shift: ${result[0]}`);
} 