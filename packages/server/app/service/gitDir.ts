import { URL } from "url";
import { getGitDirModel } from "../model/git/gitDir.js";
import { errorIfUndefined } from "../errors/helpers.js";
import { AppError } from "../errors/appError.js";
import { SESSION } from "../model/session.js";

export async function getGitDirService(): Promise<URL> {
  const gitDir = await getGitDirModel();

  errorIfUndefined(new AppError("Could not find git directory"), gitDir);

  return gitDir;
}

export async function getGitDirBySessionService(
  session: string
): Promise<URL | undefined> {
  return SESSION.getGidDir(session);
}
