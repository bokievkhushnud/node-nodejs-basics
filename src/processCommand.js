import path from "path";
import { goUp, changeDir, listFilesAndFolders } from "./navigation.js";
import {
  printEOL,
  printCPUsInfo,
  printHomeDir,
  printUserName,
  printArchitecture,
} from "./osInfo.js";
import { calculateHash } from "./hash.js";
import { compressFile, decompressFile } from "./compression.js";
import {
  addFile,
  copyFile,
  deleteFile,
  moveFile,
  readFile,
  renameFile,
} from "./fileOperations.js";

export async function processCommand(input, callback) {
  const args = input.split(" ");
  const command = args[0];

  switch (command) {
    case "ls":
      await listFilesAndFolders();
      break;
    case "up":
      await goUp();
      break;
    case "cd":
      if (args.length !== 2) {
        callback("Invalid input");
        return;
      }
      await changeDir(args[1]);
      break;
    case "cat":
      if (args.length !== 2) {
        callback("Invalid input");
        return;
      }
      const filePath = path.resolve(process.cwd(), args[1]);
      await readFile(filePath);
      break;
    case "add":
      if (args.length !== 2) {
        callback("Invalid input");
        return;
      }
      await addFile(args[1]);
      break;
    case "rn":
      if (args.length >= 3) {
        await renameFile(args[1], args[2]); // args[1] is the current file name, args[2] is the new file name
      } else {
        console.error("Invalid input: rn command requires two arguments");
      }
      break;
    case "cp":
      if (args.length >= 3) {
        await copyFile(args[1], args[2]); // args[1] is the source file, args[2] is the destination directory
      } else {
        console.error("Invalid input: cp command requires two arguments");
      }
      break;
    case "mv":
      if (args.length >= 3) {
        await moveFile(args[1], args[2]);
      } else {
        console.error("Invalid input: mv command requires two arguments");
      }
      break;
    case "rm":
      if (args.length >= 2) {
        await deleteFile(args[1]);
      } else {
        console.error("Invalid input: rm command requires a file path");
      }
      break;
    case "os":
      switch (args[1]) {
        case "--EOL":
          printEOL();
          break;
        case "--cpus":
          printCPUsInfo();
          break;
        case "--homedir":
          printHomeDir();
          break;
        case "--username":
          printUserName();
          break;
        case "--architecture":
          printArchitecture();
          break;
        default:
          console.error("Invalid OS command");
          break;
      }
      break;
    case "hash":
      if (args.length >= 2) {
        await calculateHash(args[1]);
      } else {
        console.error("Invalid input: hash command requires a file path");
      }
      break;
    case "compress":
      if (args.length >= 3) {
        await compressFile(args[1], args[2]);
      } else {
        console.error(
          "Invalid input: compress command requires source and destination paths"
        );
      }
      break;
    case "decompress":
      if (args.length >= 3) {
        await decompressFile(args[1], args[2]);
      } else {
        console.error(
          "Invalid input: decompress command requires source and destination paths"
        );
      }
      break;
    default:
      callback("Invalid input");
  }
}
