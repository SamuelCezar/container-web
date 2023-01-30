import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueTheMask from "vue-the-mask";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pathManager from "./utils/APIPathManager.js";

import Cabecalho from "./components/Cabecalho.vue";
import Routes from "./utils/routes.js";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("cabecalho", Cabecalho);
// Vue.component("font-awesome-layers", FontAwesomeLayers);
// Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueRouter);
Vue.use(VueTheMask);

Vue.prototype.$pathManager = pathManager;

const router = new VueRouter({
	routes: Routes,
	mode: "hash",
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
