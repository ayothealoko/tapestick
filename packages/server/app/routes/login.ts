import { postLoginController } from "../controllers/login.js";
import { Route, RouterClass } from "./RoutesClass.js";

const PostLoginRoute = new Route("/", [], postLoginController);

const RouterObj = new RouterClass();
RouterObj.post(PostLoginRoute);

export default RouterObj.router;
