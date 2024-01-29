import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const directory = path.join(__dirname, 'files');

    fs.readdir(directory, (err, files) => {
        if (err) throw new Error(`FS operation failed`);
        console.log(files);
    });
};

await list();