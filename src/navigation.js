import path from "path";
import { promises as fsPromises } from "fs";

export function goUp() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  // Check if the current directory is the root directory
  if (currentDir === parentDir) {
    console.log("You are at the root directory. Can't go up.");
    return;
  }

  // Change the working directory
  process.chdir(parentDir);
  console.log(`Moved up to ${parentDir}`);
}

export async function changeDir(targetPath) {
  console.log(targetPath);
  try {
    const newDir = path.resolve(process.cwd(), targetPath);
    console.log(newDir);
    await fsPromises.access(newDir);
    process.chdir(newDir);
  } catch (error) {
    console.log("Operation failed");
  }
}

export async function listFilesAndFolders() {
  try {
    const currentDir = process.cwd();
    const items = await fsPromises.readdir(currentDir, { withFileTypes: true });

    const sortedItems = items
      .map((item) => ({
        name: item.name,
        type: item.isDirectory() ? "Directory" : "File",
      }))
      .sort((a, b) => {
        // Sort by type first (directories first) and then by name
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === "Directory" ? -1 : 1;
      });

    // Determine column widths
    const indexWidth = sortedItems.length.toString().length;
    const typeWidth = Math.max(
      ...sortedItems.map((item) => item.type.length),
      "Type".length
    );

    // Print header
    console.log(
      `${"Index".padEnd(indexWidth)} ${"Type".padEnd(typeWidth)} Name`
    );
    console.log(`${"-".repeat(indexWidth)} ${"-".repeat(typeWidth)} ----`);

    // Print each item
    sortedItems.forEach((item, index) => {
      const indexStr = (index + 1).toString().padEnd(indexWidth);
      const typeStr = item.type.padEnd(typeWidth);
      console.log(`${indexStr} ${typeStr} ${item.name}`);
    });
  } catch (error) {
    console.error("Operation failed");
  }
}
