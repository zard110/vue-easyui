import Vue from 'vue'
import App from './accordion/Accordion.vue'

import EasyUI from '../easyui/index'

Vue.use(EasyUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
