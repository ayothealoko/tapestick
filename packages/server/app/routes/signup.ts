import { postSignupController } from "../controllers/signup.js";
import { Route, RouterClass } from "./RoutesClass.js";

const PostSignupRoute = new Route("/", [], postSignupController);

const RouterObj = new RouterClass();
RouterObj.post(PostSignupRoute);

export default RouterObj.router;
