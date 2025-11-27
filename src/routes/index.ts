import { readUser, writeUser } from "../helpers/fileDB";
import parseBody from "../helpers/parseBody";
import addHandler from "../helpers/routeHandler";

import sendJSON from "../helpers/sendJson";

addHandler("GET", "/", (req, res) => {
  sendJSON(res, 200, {
    message: "Hello from nodejs using typescript",
    path: req.url,
  });
});

addHandler("GET", "/api", (req, res) => {
  sendJSON(res, 200, {
    message: "health status ok",
    path: req.url,
  });
});

addHandler("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  const users = readUser();
  const newUser = {
    id: Date.now(),
    ...body,
  };

  users.push(newUser);

  writeUser(users);
  sendJSON(res, 201, { success: true, data: newUser });
});

addHandler("GET", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  const users = readUser();

  sendJSON(res, 201, { success: true, data: users });
});

addHandler("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;

  const body = await parseBody(req);

  const users = await readUser();

  const index = users.findIndex((user: any) => user.id === Number(id));

  if (index === -1) {
    sendJSON(res, 404, { message: "user not found" });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUser(users);

  console.log(users);

  sendJSON(res, 202, {
    success: true,
    message: `user with id: ${id} is updated`,
    data: users[index],
  });
});

addHandler("DELETE", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;

  const users = await readUser();

  const index = users.findIndex((user: any) => user.id === Number(id));

  if (index === -1) {
    sendJSON(res, 404, {
      message: `user with id: ${id} not found`,
      success: false,
    });
  }

  const user = users[index];

  users.splice(index, 1);

  writeUser(users);

  sendJSON(res, 202, {
    success: true,
    message: `user with id: ${id} is deleted`,
    data: user,
  });
});
