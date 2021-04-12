import Vue from 'vue'
import Vuex from 'vuex'
import bluetooth from './module/bluetooth'
import user from './module/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		bluetooth,
		user
	}
})
