import {
  getGitDirController,
  postGitDirController,
} from "../controllers/gitDir.js";
import { Route, RouterClass } from "./RoutesClass.js";

const GetGitDirRoute = new Route("/", [], getGitDirController);
const PostGitDirRoute = new Route("/", [], postGitDirController);

const RouterObj = new RouterClass();
RouterObj.get(GetGitDirRoute);
RouterObj.post(PostGitDirRoute);

export default RouterObj.router;
