export function isFile(uri: string): boolean {
  try {
    const url = new URL(uri);
    return url.protocol === "file:";
  } catch {
    return false;
  }
}

export function properURI(uri: string): string {
  const url = new URL(uri);
  return url.href;
}
