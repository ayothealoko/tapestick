import { URL } from "url";
import { SESSION } from "../model/session.js";

export async function createSessionService(
  gitDir: URL
): Promise<string | undefined> {
  return SESSION.createSession(gitDir);
}
