import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addHandler, { RouteHandler, routes } from "./helpers/RouteHandler";

addHandler("GET", "/", (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from nodejs using typescript",
      path: req.url,
    })
  );
});

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          success: false,
          message: "route not found",
          path,
        })
      );
    }

    // if (req.url === "/" && req.method === "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from nodejs using typescript",
    //       path: req.url,
    //     })
    //   );
    // }

    // if (req.url === "/api" && req.method === "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "health status ok",
    //       path: req.url,
    //     })
    //   );
    // }

    // if (req.url === "/api/users" && req.method === "POST") {
    //   let body = "";

    //   req.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });

    //   req.on("end", () => {
    //     try {
    //       console.log(body);
    //       const parsed = JSON.parse(body);
    //       res.writeHead(201);
    //       res.end(body);
    //     } catch (error: any) {
    //       console.log(error?.message);
    //       res.end(
    //         JSON.stringify({
    //           message: error.message,
    //         })
    //       );
    //     }
    //   });
    // }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
