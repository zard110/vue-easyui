import Vue from 'vue'
import App from './layout/SplitLayout.vue'

import EasyUI from '../easyui/index'

Vue.use(EasyUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
