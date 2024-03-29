import { Router } from "express";
import { ControllerType, Middleware, RequestMethod } from "@/helpers/types.js";

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
    this.router.get(route.path, route.middleware, route.controller);
  }

  post(route: Route) {
    this.router.post(route.path, route.middleware, route.controller);
  }

  delete(route: Route) {
    this.router.delete(route.path, route.middleware, route.controller);
  }

  put(route: Route) {
    this.router.put(route.path, route.middleware, route.controller);
  }
}
