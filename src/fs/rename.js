import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const rename = async () => {
  // Write your code here
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // const wrongFileName = "files/wrongFilename.txt";
  const wrongFileName = path.join(__dirname, "files", "wrongFilename.txt");
  // const properFilename = "files/properFilename.md";
  const properFilename = path.join(__dirname, "files", "properFilename.md");

  fs.access(properFilename, (err) => {
    if (!err) {
      throw new Error("FS operation failed");
    }
    fs.rename(wrongFileName, properFilename, (err) => {
      if (err) throw new Error("FS operation failed");
    });
  });
};

await rename();
