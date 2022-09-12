import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import Layout from "@/router/layout/layout.vue";
import { store } from "@/state/store";
import i18n from "@/i18n";
import ToggleButton from "vue-js-toggle-button";
import "@/index.css";
import { vuetify } from "@/plugins";
import "@/design/app.scss";
Vue.config.productionTip = false;
Vue.component("layout", Layout);
Vue.use(ToggleButton);
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
