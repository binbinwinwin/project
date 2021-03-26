// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate, { Validator } from 'vee-validate';
import zhTWValidate  from 'vee-validate/dist/locale/zh_TW';
import VueAnime from 'vue-animejs';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueCardFormat from 'vue-credit-card-validation';


import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(VueAnime);

Vue.use(VueCardFormat);

Validator.localize('zh_TW',zhTWValidate);
Vue.use(VeeValidate, {  locale:'zh_TW',events: 'input|blur'});


axios.defaults.withCredentials = true;
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  }
  else {
    next();
  }
});

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  icon: 'success',
};

Vue.use(VueSweetalert2, options);

