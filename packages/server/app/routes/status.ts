import { getStatusController } from "../controllers/status.js";
import { Route, RouterClass } from "./RoutesClass.js";

const GetStatusRoute = new Route("/", [], getStatusController);

const RouterObj = new RouterClass();
RouterObj.get(GetStatusRoute);

export default RouterObj.router;
