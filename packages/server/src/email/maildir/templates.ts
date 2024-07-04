import { z } from 'zod';
import path from 'node:path';

const FlagsSchema = z.object({
  // byte count of message
  S: z.number(),

  // Opean Api state
  // 0 -  unprocessed
  // 1 -  processing
  // 3 -  no spam
  // 4 -  spam
  O: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),

  // 0 - white list
  // 1 - black list
  F: z.union([z.literal(0), z.literal(1)]).optional(),
});

export interface Flags extends z.infer<typeof FlagsSchema> {}

export function messageTemplate(data: {
  epoch: number;
  uuid: string;
  flags: Flags;
}): string {
  return `${data.epoch}.${data.uuid}${flagsTemplate(data.flags)}`;
}

export function flagsTemplate(flags: Flags) {
  let final = '';

  for (const [key, value] of Object.entries(flags)) {
    final += `,${key}=${value}`;
  }

  return final;
}

export function getDataFromMsg(msgFileName: string): {
  epoch: number;
  uuid: string;
  flags: Flags;
} | null {
  const r = /(\d*)\.(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})(,[A-Z]=\d+)*/;

  const match = msgFileName.match(r);
  if (match === null || match.length < 2) {
    return null;
  }

  const flagsArr = match.slice(2);
  const final = {
    epoch: Number(match[1]),
    uuid: match[2],
    flags: parseFlags(flagsArr),
  };

  return final;
}

function parseFlags(s: string[]): Flags {
  const flags = s.reduce((p: Record<string, number>, c) => {
    const val = c.slice(1).split('=');
    const intVal = parseInt(val[1]);

    p[val[0]] = intVal;
    return p;
  }, {});

  //unsafe
  const parsedFlags = FlagsSchema.parse(flags);

  return parsedFlags;
}

function isLocked(s: string) {
  const f = path.basename(s);
  const fReg = /.locked$/;

  const match = f.match(fReg);

  if (match === null) {
    return false;
  }

  return true;
}
