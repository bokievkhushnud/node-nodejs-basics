import fs from "fs";

const copy = async () => {
  const source = "files";
  const destination = "files_copy";
  fs.access(source, fs.constants.F_OK, (err) => {
    if (!err) {
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
