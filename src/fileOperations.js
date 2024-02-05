import { promises as fsPromises } from "fs";
import { createReadStream, createWriteStream } from "fs";
import path from "path";

export function readFile(filePath) {
  const readStream = createReadStream(filePath);

  readStream.on("error", (error) => {
    console.log(`Operation failed`);
  });

  readStream.pipe(process.stdout);
}

export async function addFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);

  try {
    await fsPromises.writeFile(filePath, "");
    console.log(`Created an empty file at ${filePath}`);
  } catch (error) {
    console.error(`Operation failed`);
  }
}

export async function renameFile(oldPath, newName) {
  const oldFullPath = path.join(process.cwd(), oldPath);
  const newFullPath = path.join(process.cwd(), newName);

  try {
    await fsPromises.rename(oldFullPath, newFullPath);
    console.log(`Renamed file from ${oldPath} to ${newName}`);
  } catch (error) {
    console.error(`Operation failed`);
  }
}

export async function copyFile(sourcePath, destinationDir) {
  const sourceFullPath = path.join(process.cwd(), sourcePath);
  const destinationFullPath = path.join(
    process.cwd(),
    destinationDir,
    path.basename(sourcePath)
  );

  try {
    // Check if destination directory exists
    await fsPromises.access(destinationDir);

    const readStream = createReadStream(sourceFullPath);
    const writeStream = createWriteStream(destinationFullPath);

    readStream.on("error", (error) => {
      console.error(`Failed to read file: ${error.message}`);
    });

    writeStream.on("error", (error) => {
      console.error(`Failed to write file: ${error.message}`);
    });

    readStream.pipe(writeStream);
    writeStream.on("finish", () => {
      console.log(`Copied file to ${destinationFullPath}`);
    });
  } catch (error) {
    console.error(`Operation failed`);
  }
}

export async function moveFile(sourcePath, destinationDir) {
  const sourceFullPath = path.join(process.cwd(), sourcePath);
  const destinationFullPath = path.join(
    process.cwd(),
    destinationDir,
    path.basename(sourcePath)
  );

  try {
    // Check if destination directory exists
    await fsPromises.access(destinationDir);

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(sourceFullPath);
      const writeStream = createWriteStream(destinationFullPath);

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(writeStream);
    });

    // Delete the original file after successful copy
    await fsPromises.unlink(sourceFullPath);
    console.log(`Moved file from ${sourcePath} to ${destinationDir}`);
  } catch (error) {
    console.error(`Operation failed`);
  }
}

export async function deleteFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  try {
    await fsPromises.unlink(fullPath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    console.error(`Operation failed`);
  }
}