import readline from 'readline';
import { processCommand } from './processCommand.js';
import os from 'os';

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const username = process.argv.slice(2).find(arg => arg.startsWith('--username='))?.split('=')[1] ?? 'User';
console.log(`Welcome to the File Manager, ${username}!`);

rl.on('line', (input) => {
  if (input === '.exit') {
    rl.close();
  }
  processCommand(input, (response) => {
    console.log(`You are currently in ${process.cwd()}`);
    rl.prompt();
  });
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

console.log(`You are currently in ${process.cwd()}`);
rl.prompt();
