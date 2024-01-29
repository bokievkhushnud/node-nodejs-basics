import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filename = path.join(__dirname, "files", "fresh.txt");
    const content = 'I am fresh and young';

    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                throw new Error(`FS operation failed`);
            }
            throw err;
        }
        
        fs.write(fd, content, (err) => {
            if (err) throw err;
            fs.close(fd, (err) => {
                if (err) throw err;
                console.log(`File "${filename}" has been created.`);
            });
        });
    });
};

await create();