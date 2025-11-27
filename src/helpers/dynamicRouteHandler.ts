import { routes } from "./routeHandler";

const findDynamicRoute = (method: string, url: string) => {
  const methodMap = routes.get(method);

  if (!methodMap) return null;

  for (const [routePath, handler] of methodMap.entries()) {
    const routeParts = routePath.split("/");
    const urlParts = url.split("/");

    if (routeParts.length !== urlParts.length) continue;

    const params: any = {};
    let match = true;

    for (let index = 0; index < routeParts.length; index++) {
      if (routeParts[index]?.startsWith(":")) {
        params[routeParts[index]?.substring(1)!] = urlParts[index];
      } else if (routeParts[index] !== urlParts[index]) {
        match = false;
        break;
      }
    }

    if (match) {
      return { params, handler };
    }
  }
  return null;
};

export default findDynamicRoute;
