import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layout/MainLayout.tsx", [
    route("katalog", "routes/katalog.tsx"),
    route("katalog/:slug", "routes/katalog-detail.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
