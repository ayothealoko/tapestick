import { Request, Response } from "express";
import { getStatusService } from "../service/status.js";

export const getStatusController = async (req: Request, res: Response) => {
  const body = req.body;
  let fileURI = new URL(body.gitDirURI);
  const status = await getStatusService(fileURI);

  res.status(200);
  res.send(status);
};
