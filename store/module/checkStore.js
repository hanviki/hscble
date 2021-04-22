//设置 是否做过保存血糖和出汗
export default {
	state: {
		isSave: uni.getStorageSync('isSave') || 0, // 是否保存了血糖和出汗
	},
	getters: {
		getIsSave: state => state.isSave
	},
	mutations: {
		/**
		 * 设置isSave
		 * @param {Object} state
		 * @param {Boolean} isSave
		 */
		setIsSave(state, isSave) {
			state.isSave = isSave
			uni.setStorageSync('isSave', isSave)
		}

	},
	actions: {
		async doSetting({
			dispatch,
			commit,
			state
		}, value) {
			commit('setIsSave', value)
		}
	}
}
