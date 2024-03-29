import { postSignupController } from "@/features/auth/controllers/signup.js";
import { Route, RouterClass } from "@/router/RoutesClass.js";

const PostSignupRoute = new Route("/", [], postSignupController);

const RouterObj = new RouterClass();
RouterObj.post(PostSignupRoute);

export default RouterObj.router;
