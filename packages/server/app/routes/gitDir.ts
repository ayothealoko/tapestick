import { getGitDirController } from "../controllers/gitDir.js";
import { Route, RouterClass } from "./RoutesClass.js";

const GetGitDirRoute = new Route("/", [], getGitDirController);

const RouterObj = new RouterClass();
RouterObj.get(GetGitDirRoute);

export default RouterObj.router;
