import crypto from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export async function calculateHash(filePath) {
    const hash = crypto.createHash('sha256');
    const readStream = createReadStream(filePath);

    try {
        await pipelineAsync(readStream, hash);
        console.log(`Hash for '${filePath}': ${hash.digest('hex')}`);
    } catch (error) {
        console.error(`Operation failed`);
    }
}
