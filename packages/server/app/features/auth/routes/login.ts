import { postLoginController } from "@/features/auth/controllers/login.js";
import { Route, RouterClass } from "@/router/RoutesClass.js";

const PostLoginRoute = new Route("/", [], postLoginController);

const RouterObj = new RouterClass();
RouterObj.post(PostLoginRoute);

export default RouterObj.router;
