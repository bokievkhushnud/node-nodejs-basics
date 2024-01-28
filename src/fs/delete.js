import fs from "fs";

const remove = async () => {
  const fileToRemove = "files/fileToRemove.txt";

  fs.rm(fileToRemove, (err) => {
    if (err) throw new Error(`FS operation failed`);
    console.log("File removed!");
  });
};

await remove();
