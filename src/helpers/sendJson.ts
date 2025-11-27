import { ServerResponse } from "http";

const sendJSON = (res: ServerResponse, statusCode: number, data: any): void => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
};

export default sendJSON;
