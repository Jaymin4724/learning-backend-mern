// https://docs.google.com/document/d/19RgZH-rZo4eyp3i7zxdl2LDyGTVcEcRl1Ji8EhunlYM/edit?usp=sharing
import * as fs from "fs";
import { sum, diff } from "./lib.js";

// Synchronous file reading (blocking)
const txt = fs.readFileSync("demo.txt", "utf-8"); //-> not recommended
console.log(txt);

// Asynchronous file reading (non-blocking)
fs.readFile("demo.txt", "utf-8", (err, txt) => {
  if (err) {
    console.log("error in reading the file: ", err);
    return;
  }
  console.log(txt);
});

console.log("Sum and Difference:", sum(10, 5), diff(10, 5));

// Synchronous (Blocking the server):
// const ans = readFileSync(FILENAME, ENCODING);
// - Reads the whole file first and stores its content in the 'ans' variable.
// - Blocks the server, so nothing else happens until the file is fully read.
// - Not suitable for servers, but fine for simple scripts.

// Asynchronous (Non-blocking):
// readFile(FILENAME, ENCODING, CALLBACK FUNCTION);
// - Reads the file without blocking the server.
// - The result is handled inside the callback function when reading is complete.
// - Best for servers as it allows other tasks to run while the file is being read.
