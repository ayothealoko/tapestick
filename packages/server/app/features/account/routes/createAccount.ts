import { Route, RouterClass } from "@/router/RoutesClass.js";
import { postCreateAccountController } from "../controllers/createAccount.js";

const PostCreateAccountRoute = new Route("/", [], postCreateAccountController);

const RouterObj = new RouterClass();
RouterObj.post(PostCreateAccountRoute);

export default RouterObj.router;
