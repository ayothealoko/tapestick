import { app } from "@/app.js";
import { AccountRouterObj } from "@/features/account/routes/index.js";
import { AuthRouterObj } from "@/features/auth/routes/index.js";
import { apiErrorHandler } from "@/middlewares/apiErrorHandler.js";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use("/api/v1/auth", AuthRouterObj.router);
mainRouter.use("/api/v1/account", AccountRouterObj.router);
mainRouter.use("/api", apiErrorHandler);

export { mainRouter };
