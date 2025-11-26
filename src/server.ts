import http, { IncomingMessage, Server, ServerResponse } from "http";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running");

    if (req.url === "/" && req.method === "GET") {
      console.log("server hit");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from nodejs using typescript",
          path: req.url,
        })
      );
    }
  }
);

server.listen(5000, () => {
  console.log(`Server is running on post: ${5000}`);
});
