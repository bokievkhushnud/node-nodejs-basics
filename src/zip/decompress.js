import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const decompress = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const inputFilePath = path.join(__dirname, 'files', 'archive.gz');
    const inputStream = fs.createReadStream(inputFilePath);

    const outputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const outputStream = fs.createWriteStream(outputFilePath);

    const gunzip = zlib.createGunzip();

    inputStream.pipe(gunzip).pipe(outputStream);

    outputStream.on('finish', () => {
        console.log('File decompressed');
    });
    
};

await decompress();