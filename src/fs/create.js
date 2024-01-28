import fs from "fs";

const create = async () => {
    const filename = 'files/fresh.txt';
    const content = 'I am fresh and young';

    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                throw new Error(`FS operation failed`);
            }
            throw err;
        }

        // Write to the file and then close it
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