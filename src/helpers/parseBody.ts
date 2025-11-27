import { IncomingMessage } from "http";

const parseBody = async (req: IncomingMessage): Promise<any> => {
  let body = "";
  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err: any) {
        reject(err);
      }
    });

    req.on("error", reject);
  });
};


export default parseBody