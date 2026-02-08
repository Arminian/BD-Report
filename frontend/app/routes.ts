import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Index route
  index("routes/dashboard.tsx"),
  route("dashboard/:cityId", "routes/city.$id.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
