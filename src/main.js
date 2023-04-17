import {
  createApp
} from "vue";
import {
  createPinia
} from "pinia";
import { Lazyload  } from 'vant'
import App from "./App.vue";
import router from "./router";
import "@/plugins/vant/index.js";
// import "./assets/main.css";
import "./assets/base.css";
import './assets/font/font.css';
import "amfe-flexible";
const app = createApp(App);

app
    .use(createPinia())
    .use(router)
    .use(Lazyload)
    .mount("#app");