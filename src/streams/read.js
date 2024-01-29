import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const readableStream = fs.createReadStream(filePath);

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

};

await read();