import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

import sendJSON from "./helpers/sendJson";
import "./routes";
import findDynamicRoute from "./helpers/dynamicRouteHandler";
import { RouteHandler, routes } from "./helpers/routeHandler";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else if (findDynamicRoute(method, path)) {
      const match = findDynamicRoute(method, path);

      (req as any).params = match?.params;

      match?.handler(req, res);
    } else {
      sendJSON(res, 404, {
        success: false,
        message: "route not found",
        path,
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
