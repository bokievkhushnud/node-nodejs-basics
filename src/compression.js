import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export async function compressFile(sourcePath, destinationPath) {
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    const brotliCompress = createBrotliCompress();

    try {
        await pipelineAsync(sourceStream, brotliCompress, destinationStream);
        console.log(`Compressed file saved to ${destinationPath}`);
    } catch (error) {
        console.error(`Failed to compress file: ${error.message}`);
    }
}

export async function decompressFile(sourcePath, destinationPath) {
    const sourceStream = createReadStream(sourcePath);
    const destinationStream = createWriteStream(destinationPath);
    const brotliDecompress = createBrotliDecompress();

    try {
        await pipelineAsync(sourceStream, brotliDecompress, destinationStream);
        console.log(`Decompressed file saved to ${destinationPath}`);
    } catch (error) {
        console.error(`Failed to decompress file: ${error.message}`);
    }
}
