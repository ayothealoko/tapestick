import fs from 'node:fs/promises';
import path from 'node:path';
import { Flags } from './templates';

export interface ExistsReturn<T> {
  exists: boolean;
  isType: boolean;
  result?: T;
  error?: any;
}

export async function existsAndType(
  pathString: string,
  type: 'file' | 'dir' = 'file',
): Promise<[boolean, boolean]> {
  let exists = false;
  let isType = false;
  try {
    const stat = await fs.stat(pathString);
    exists = true;

    if (type === 'file' && stat.isFile()) {
      throw new Error(`${pathString} SHOULD BE A FOLDER NOT FILE`);
    }

    if (type === 'dir' && stat.isDirectory()) {
      throw new Error(`${path} SHOULD BE A File NOT FOLDER`);
    }

    isType = true;
  } catch (err) {}

  return [exists, isType];
}

export async function existsElse<T>(
  pathString: string,
  type: 'file' | 'dir' = 'file',
  elseFunc: (url: string) => Promise<T>,
): Promise<ExistsReturn<T>> {
  const [exists, isType] = await existsAndType(pathString, type);
  let final: ExistsReturn<T> = { exists, isType };
  try {
    if (!exists) {
      // can throw
      final.result = await elseFunc(pathString);
    }

    if (exists && !isType) {
      // can throw
      throw new Error(`${pathString} SHOULD BE A File NOT FOLDER`);
    }
  } catch (err) {
    final.error = err;
  }

  return final;
}

export async function existsThen<T, N>(
  pathString: string,
  type: 'file' | 'dir' = 'file',
  thenFunc: (url: string) => Promise<N>,
  elseFunc: (url: string) => Promise<T>,
): Promise<ExistsReturn<T | N>> {
  const [exists, isType] = await existsAndType(pathString, type);
  let final: ExistsReturn<T | N> = { exists, isType };
  try {
    if (!exists) {
      // can throw
      final.result = await elseFunc(pathString);
    }

    if (exists && isType) {
      // can throw
      final.result = await thenFunc(pathString);
    }

    if (exists && !isType) {
      // can throw
      throw new Error(`${pathString} SHOULD BE A File NOT FOLDER`);
    }
  } catch (err) {
    final.error = err;
  }

  return final;
}

export async function makeDir(path: string, recursive: boolean = false) {
  try {
    await existsElse(path, 'dir', (p: string) =>
      fs.mkdir(p, { recursive: true }),
    );
  } catch (err) {
    throw err;
  }
}

export type Folder = 'INBOX' | 'TAPESTICK';
export type FolderPos = 'tmp' | 'new' | 'cur';
