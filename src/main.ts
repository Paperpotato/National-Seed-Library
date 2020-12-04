import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VuePwaInstallPlugin from "vue-pwa-install";
import './registerServiceWorker'
//@ts-expect-error
import VueSession from 'vue-session';

Vue.use(VuePwaInstallPlugin);
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
