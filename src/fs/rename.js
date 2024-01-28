import fs from "fs";

const rename = async () => {
  // Write your code here
  const wrongFileName = "files/wrongFilename.txt";
  const properFilename = "files/properFilename.md";

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
