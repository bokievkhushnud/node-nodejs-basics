import readline from "readline";
import { processCommand } from "./processCommand.js";
import os from "os";

const showCurrentDirectory = () => {
  process.stdout.write(`You are currently in '${process.cwd()}'\n`);
};

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1] ?? "User";
console.log(`Welcome to the File Manager, ${username}!`);

rl.on("line", async(input) => {
  if (input === ".exit") {
    rl.close();
  }
  await processCommand(input, (error) => {
    console.error("Invalid input");
  });
  showCurrentDirectory();
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

showCurrentDirectory();
rl.prompt();
