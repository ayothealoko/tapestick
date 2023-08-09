import { getStatusController } from "../controllers/status.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { urlencodedParser } from "../middleware/bodyparser.js";
import { getStatusSchema } from "../validation/status.js";
import { Router } from "express";

const router = Router();

const postMiddleware = [urlencodedParser, getStatusSchema];

router.get("/", postMiddleware, tryCatch(getStatusController));

export default router;
