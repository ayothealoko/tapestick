import { pathToFileURL } from "url";
import { promises as fsp } from "fs";
import path from "path";
import { homedir } from "os";
import { AppError } from "../../errors/appError.js";

export async function getGitDirModel(): Promise<URL | undefined> {
  let cwd = process.cwd();

  try {
    const homeDir = homedir();
    while (cwd !== homeDir) {
      const files = await fsp.readdir(cwd, { withFileTypes: true });
      const gitDir = files.filter((file) => {
        if (file.isDirectory() && file.name === ".git") {
          return true;
        }
        return false;
      });

      if (gitDir.length !== 0) {
        return pathToFileURL(cwd);
      }
      cwd = path.dirname(cwd);
    }
  } catch {
    throw new AppError("No git dir in folder or Parent directories");
  }
}
