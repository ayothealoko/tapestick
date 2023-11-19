import { postSessionController } from "../controllers/session.js";
import { Route, RouterClass } from "./RoutesClass.js";

const PostSessionRoute = new Route("/", [], postSessionController);

const RouterObj = new RouterClass();
RouterObj.post(PostSessionRoute);

export default RouterObj.router;
