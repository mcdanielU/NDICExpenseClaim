import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHtmlToPaper from 'vue-html-to-paper'
import App from './App.vue'
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

import router from './router'


const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://drive.google.com/file/d/1hVdjioAVt1VfIaN-cZ6ahrrm868gli2N/view'
  ]
}

Vue.config.productionTip = false
Vue.use(Vuesax);
Vue.use(VueRouter);
Vue.use(VueHtmlToPaper, options);


new Vue({
  render: h => h(App),
  router,

}).$mount('#app')
