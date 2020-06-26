import Vue from 'vue';
import App from './App.vue';
import { format, toDate } from 'date-fns';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

import Vue2Filters from 'vue2-filters';

import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.config.productionTip = false;

Vue.filter('longDate', function (value: Date | string) {
  if (!value) return '';
  if (typeof value == 'string') value = toDate(Date.parse(value));
  return format(value, 'MMMM do, yyyy');
});

Vue.use(Vue2Filters);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
