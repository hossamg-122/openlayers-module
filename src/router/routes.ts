import { RouteConfig } from "vue-router";
export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(
        /* webpackChunkName: "Home-page" */ "@/router/pages/Home/Home.vue"
      ),
  },
];
