import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');

    fs.readFile(fileToRead, (err, data) => {
        if (err) throw new Error(`FS operation failed`);
        console.log(data.toString());
    });
};

await read();