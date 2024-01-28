import fs from 'fs';

const read = async () => {
    // Write your code here 
    const fileToRead = 'files/fileToRead.txt';
    fs.readFile(fileToRead, (err, data) => {
        if (err) throw new Error(`FS operation failed`);
        console.log(data.toString());
    });
};

await read();