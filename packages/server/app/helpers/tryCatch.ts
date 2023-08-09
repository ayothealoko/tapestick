import { NextFunction, Request, Response } from "express";

export const tryCatch =
  (controller) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
