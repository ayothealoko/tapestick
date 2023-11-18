import { tmpdir } from "os";
import { mkdir, mkdtemp, rm, readdir, copyFile, rename } from "fs/promises";
import Path, { sep, join } from "path";

// To use make sure that .git folder is renamed temp.git
export async function useFixture(
  fixtureName: string,
  callback: (path: string) => Promise<any>
) {
  try {
    const tempDir = tmpdir();
    const folder = await mkdtemp(`${tempDir}${sep}`);
    const fixtureSrc = join(__dirname, "../fixtures", fixtureName);

    await copyFolder(fixtureSrc, folder);
    rename(join(folder, "temp.git"), join(folder, ".git"));

    await callback(folder);
    await rm(folder, { recursive: true });
  } catch (err) {
    console.log(err);
  }
}

async function copyFolder(src: string, dest: string, top: boolean = true) {
  const entries = await readdir(src, { withFileTypes: true });
  if (!top) {
    await mkdir(dest);
  }
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath, false);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}
