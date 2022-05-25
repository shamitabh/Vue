import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import * as bulmaToast from "bulma-toast";

// Vue app
createApp(App).use(store).use(router).mount("#app");

// set default options for notifications
bulmaToast.setDefaults({
  position: "bottom-right",
  dismissible: true,
  duration: 2000,
});
