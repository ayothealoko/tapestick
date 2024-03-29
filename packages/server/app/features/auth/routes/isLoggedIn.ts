import { getIsLoggedInController } from "@/features/auth/controllers/isLoggedIn.js";
import { Route, RouterClass } from "@/router/RoutesClass.js";

const GetIsLoggedInRoute = new Route("/", [], getIsLoggedInController);

const RouterObj = new RouterClass();
RouterObj.get(GetIsLoggedInRoute);

export default RouterObj.router;
