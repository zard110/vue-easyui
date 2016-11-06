import './easyui.css'
import './icon.css'

import Panel from './components/panel.vue'
import Layout from './components/layout.vue'
import LayoutPanel from './components/layout.panel.vue'

const install = function (Vue) {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.component(Panel.name, Panel);
  Vue.component(Layout.name, Layout);
  Vue.component(LayoutPanel.name, LayoutPanel);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '0.1.0',
  install,
  Panel,
  Layout
};
