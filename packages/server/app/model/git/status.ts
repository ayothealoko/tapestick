import { Status, StatusFile, statusRecord } from "shared-code";
import { fileURLToPath } from "url";
import git from "isomorphic-git";
import fs from "fs";
import path from "path";

export async function getStatusModel(gitDirURI: URL): Promise<Status> {
  const status = await git.statusMatrix({
    fs,
    dir: fileURLToPath(gitDirURI),
  });
  const files = matrixToFile(status);
  const sections = statusSections(files);
  return sections;
}

function matrixToFile(
  status: Awaited<ReturnType<typeof git.statusMatrix>>
): StatusFile[] {
  const ans = status.map((v) => {
    let file: StatusFile = {
      status: v.slice(1) as number[],
      fileName: v[0],
      serialize: serialize(v),
    };

    return file;
  });

  return ans;
}

function statusSections(files: StatusFile[]): Status {
  let status: Status = {
    unstaged: [],
    staged: [],
    untracked: [],
    unmodified: [],
  };

  files.forEach((v) => {
    const section = statusRecord[v.serialize];
    if (section.isDeleted === true) {
      v.isDeleted = true;
    }

    if (Array.isArray(section.section)) {
      section.section.forEach((s) => {
        if (s in status) {
          status[s].push(v);
        }
      });
    } else {
      if (section.section in status) {
        status[section.section].push(v);
      }
    }
  });

  return status;
}

function serialize(row: Array<String | number>): string {
  if (row.length === 4) {
    return `${row[1]}${row[2]}${row[3]}`;
  } else {
    return "000";
  }
}
