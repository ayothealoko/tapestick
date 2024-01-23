import { Router } from "express";
import { ControllerType, Middleware, RequestMethod } from "../helpers/types.js";
import { jsonParser, urlencodedParser } from "../middleware/bodyparser.js";

export class Route {
  middleware: Middleware[];
  controller: ControllerType;
  path: string;
  constructor(
    path: string,
    middleware: Middleware[],
    controller: ControllerType
  ) {
    this.path = path;
    this.middleware = middleware;
    this.controller = controller;
  }

  setRequestType(requestType: RequestMethod) {
    if (requestType === "Get") {
      this.middleware.unshift(urlencodedParser);
    } else {
      this.middleware.unshift(jsonParser);
    }
  }
}

export class RouterClass {
  router: Router;

  constructor(middleware?: Middleware[]) {
    this.router = Router();
    if (middleware) {
      this.router.use(middleware);
    }
  }

  get(route: Route) {
    route.setRequestType("Get");
    this.router.get(route.path, route.middleware, route.controller);
  }

  post(route: Route) {
    route.setRequestType("Post");
    this.router.post(route.path, route.middleware, route.controller);
  }

  delete(route: Route) {
    route.setRequestType("Delete");
    this.router.delete(route.path, route.middleware, route.controller);
  }

  put(route: Route) {
    route.setRequestType("Put");
    this.router.put(route.path, route.middleware, route.controller);
  }
}
