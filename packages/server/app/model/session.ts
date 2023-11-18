import { v4 as uuid } from "@lukeed/uuid";
import { URL } from "url";

class GitDirSession {
  // string is session
  private searchBySession: Map<string, URL>;
  // url as string is index, second is session
  private searchByUrl: Map<string, string>;

  constructor() {
    this.searchBySession = new Map();
    this.searchByUrl = new Map();
  }

  createSession(gitDir: URL): string | undefined {
    const dir = URL.toString();

    if (!this.searchByUrl.has(dir)) {
      const session = uuid();
      this.searchBySession.set(session, gitDir);
      this.searchByUrl.set(dir, session);
      return session;
    }

    let session = this.searchByUrl.get(dir);
    return session;
  }

  getGidDir(session: string): URL | undefined {
    return this.searchBySession.get(session);
  }
}

export const SESSION = new GitDirSession();
