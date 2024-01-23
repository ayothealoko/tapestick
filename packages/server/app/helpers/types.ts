import { Request, Response, NextFunction } from "express";

export type RequestMethod = "Get" | "Post" | "Put" | "Delete";

export interface Middleware {
  (Req: Request, res: Response, next: NextFunction): void | Promise<void>;
}

export interface ControllerType extends Middleware {}
