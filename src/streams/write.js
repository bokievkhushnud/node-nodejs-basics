import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writableStream = fs.createWriteStream(filePath);

    process.stdin.pipe(writableStream);
    process.stdin.on('end', () => {
        console.log('Finished writing to file');
    });

};

await write();