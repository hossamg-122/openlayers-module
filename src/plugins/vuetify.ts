import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import {
  pinIcon,
  locationIcon,
  targetIcon,
  realStateIcon,
} from "@/assets/icons";
Vue.use(Vuetify);
const opts = {
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#101820",
        secondary: "#e33065",
        info: "#46beea",
        warning: "#f7ac46",
        success: "#2ad03d",
        danger: "#dd173d",
        white: "#ffffff",
      },
    },
  },
  icons: {
    values: {
      pin: {
        component: pinIcon,
      },
      location: {
        component: locationIcon,
      },
      target: {
        component: targetIcon,
      },
      realState: {
        component: realStateIcon,
      },
    },
  },
};
export const vuetify = new Vuetify(opts);
