import { NextFunction, Request, Response } from "express";

export const getIsLoggedInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
};
