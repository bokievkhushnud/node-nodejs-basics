import { Worker } from 'worker_threads';
import os from 'os';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const workerFilePath = path.join(__dirname, 'worker.js');
    const numCores = os.cpus().length;
    const results = [];
    
    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(workerFilePath);
        worker.postMessage(10 + i);

        await new Promise((resolve, reject) => {
            worker.once('message', (result) => {
                results.push({ status: 'resolved', data: result });
                resolve();
            });

            worker.once('error', (error) => {
                console.error(`Worker error: ${error}`);
                results.push({ status: 'error', data: null });
                resolve();
            });

            worker.once('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code ${code}`);
                }
            });
        });
    }

    console.log(results);
};

await performCalculations();