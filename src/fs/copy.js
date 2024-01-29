import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  // Write your code here
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const source = path.join(__dirname, "files");
  const destination = path.join(__dirname, "files_copy");

  fs.access(destination, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log(err)
      throw new Error(`FS operation failed`);
    }
    fs.mkdir(destination, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`Directory "${destination}" has been created.`);

      fs.readdir(source, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          fs.copyFile(`${source}/${file}`, `${destination}/${file}`, (err) => {
            if (err) throw err;
            console.log(`File "${file}" has been copied.`);
          });
        });
      });
    });
  });
};

await copy();
