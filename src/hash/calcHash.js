import { createHash } from 'crypto';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('data', (data) => {
        hash.update(data);
    });
    fileStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};

await calculateHash();