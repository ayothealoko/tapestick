import { postSignupController } from "@/features/auth/controllers/signup.js";
import { postLoginController } from "@/features/auth/controllers/login.js";
import { getIsLoggedInController } from "@/features/auth/controllers/isLoggedIn.js";
import { Route, RouterClass } from "@/router/RoutesClass.js";

const GetIsLoggedInRoute = new Route(
  "/is-logged-in",
  [],
  getIsLoggedInController
);
const PostLoginRoute = new Route("/login", [], postLoginController);
const PostSignupRoute = new Route("/signup", [], postSignupController);

export const AuthRouterObj = new RouterClass();
AuthRouterObj.get(GetIsLoggedInRoute);
AuthRouterObj.post(PostLoginRoute);
AuthRouterObj.post(PostSignupRoute);
