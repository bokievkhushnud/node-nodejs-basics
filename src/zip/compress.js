import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const compress = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const inputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const inputStream = fs.createReadStream(inputFilePath);

    const outputFilePath = path.join(__dirname, 'files', 'archive.gz');
    const outputStream = fs.createWriteStream(outputFilePath);

    const gzip = zlib.createGzip();
    
    inputStream.pipe(gzip).pipe(outputStream);

    outputStream.on('finish', () => {
        console.log('File compressed');
    });

};

await compress();