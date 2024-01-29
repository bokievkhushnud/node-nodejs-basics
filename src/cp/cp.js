import { spawn } from "child_process";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  // Write your code here
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const scriptPath = path.join(__dirname, "files", "script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", process.stderr, "ipc"],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
// spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
spawnChildProcess(['arg1', 'arg2', 'arg3']);

