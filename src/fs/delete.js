import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  // Write your code here
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // const fileToRemove = "files/fileToRemove.txt";
  const fileToRemove = path.join(__dirname, "files", "fileToRemove.txt");

  fs.rm(fileToRemove, (err) => {
    if (err) throw new Error(`FS operation failed`);
    console.log("File removed!");
  });
};

await remove();
