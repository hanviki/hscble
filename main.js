import Vue from 'vue'
import App from './App'

import store from '@/store';
import apis from '@/api/index'
import * as common from '@/utils/common'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import drawerSettings from './components/drawer-settings.vue'
Vue.component('drawer-settings', drawerSettings)

import bluetooth from './components/bluetooth.vue'
Vue.component('bluetooth', bluetooth)

import uView from 'uview-ui'
Vue.use(uView)

Vue.prototype.$store = store;
Vue.prototype.$api = apis;
Vue.prototype.$common = common;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
