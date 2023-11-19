import { NextFunction, Request, Response } from "express";
import { getGitDirService } from "../service/gitDir.js";
import { GetGitDir } from "shared-code";

export const getGitDirController = async (_req: Request, res: Response) => {
  const gitDir = await getGitDirService();
  const final: GetGitDir = {
    gitDir: gitDir.toString(),
  };
  res.status(200);
  res.json(final);
};
