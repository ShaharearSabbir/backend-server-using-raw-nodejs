import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/data/users.json");

export const readUser = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  if (data) {
    return JSON.parse(data);
  } else return [];
};

export const writeUser = (users: any) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};



