import fs from 'fs';
const list = async () => {
    const directory = 'files3';
    fs.readdir(directory, (err, files) => {
        if (err) throw new Error(`FS operation failed`);
        console.log(files);
    });
};

await list();