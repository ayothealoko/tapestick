import { Route, RouterClass } from "@/router/RoutesClass.js";
import { postCreateAccountController } from "../controllers/createAccount.js";

const PostCreateAccountRoute = new Route("/", [], postCreateAccountController);

export const AccountRouterObj = new RouterClass();
AccountRouterObj.post(PostCreateAccountRoute);
