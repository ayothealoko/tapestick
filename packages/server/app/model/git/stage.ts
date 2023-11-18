import { fileURLToPath } from "url";
import { relative } from "path";
import git from "isomorphic-git";
import fs from "fs";
import { AppError } from "../../errors/appError.js";

export async function setStageModel(gitDir: URL, files: URL[]) {
  const pathGitDir = fileURLToPath(gitDir);
  const pathFiles = files
    .map(fileURLToPath)
    .map((x) => relative(pathGitDir, x));

  try {
    await git.add({
      fs,
      dir: pathGitDir,
      filepath: pathFiles,
    });
  } catch {
    throw new AppError("Could not add files to stage");
  }
}
