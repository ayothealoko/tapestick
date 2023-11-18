import { URL } from "url";
import { getGitDirModel } from "../model/git/gitDir.js";
import { SESSION } from "../model/session.js";
import { errorIfUndefined } from "../errors/helpers.js";
import { AppError } from "../errors/appError.js";

export async function getGitDirService(): Promise<URL> {
  const gitDir = await getGitDirModel();

  errorIfUndefined(new AppError("Could not find git directory"), gitDir);

  return gitDir;
}

export async function createGitDirSessionService(
  gitDir: URL
): Promise<string | undefined> {
  return SESSION.createSession(gitDir);
}

export async function getGitDirSessionService(
  session: string
): Promise<URL | undefined> {
  return SESSION.getGidDir(session);
}
