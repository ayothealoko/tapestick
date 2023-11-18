import { Status, StatusFile, statusRecord } from "shared-code";
import { fileURLToPath } from "url";
import git from "isomorphic-git";
import fs from "fs";

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
    let status = v.slice(1) as number[];
    let serializeId = serialize(v);
    let file: StatusFile = {
      status: status,
      fileName: v[0],
      serialize: serializeId,
      statusField: statusRecord[serializeId],
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
    notFound: [],
  };

  files.forEach((v) => {
    v.statusField.forEach((s) => {
      status[s.type].push(v);
    });
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
