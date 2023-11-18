import { postStageController } from "../controllers/stage.js";
import { Route, RouterClass } from "./RoutesClass.js";

const PostStageRoute = new Route("/", [], postStageController);

const RouterObj = new RouterClass();
RouterObj.post(PostStageRoute);

export default RouterObj.router;
