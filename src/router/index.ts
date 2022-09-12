import Vue from "vue";
import vueRouter from "vue-router";
import VueMeta from "vue-meta";
import { Route, NavigationGuardNext } from "vue-router";
import { routes } from "./routes";
import * as types from "@/state/types";
import { store } from "@/state/store";
import "boxicons/css/boxicons.min.css";

Vue.use(vueRouter);
Vue.use(VueMeta);
const router = new vueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(
  (routeTo: Route, routeFrom: Route, next: NavigationGuardNext) => {
    const authRequired = routeTo.matched.some(
      (route) => route.meta.authRequired
    );
    console.log("authRequired", authRequired);
    if (!authRequired) return next();

    if (store.getters[types.VALIDATE_USER_DATA]) {
      console.log("authRequired", store.getters[types.GET_USER_DATA]);
      next();
    } else {
      next({ name: "Login", query: { redirectFrom: routeTo.fullPath } });
    }
  }
);
export default router;
