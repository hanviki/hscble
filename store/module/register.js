export default {
	state: {
		telphone: uni.getStorageSync('telphone')
	},
	getters: {
		getTelphone: state => state.telphone
	},
	mutations: {
		setTelphone(state, telphone) {
			console.info("存储:"+telphone)
			state.telphone = telphone
			uni.setStorageSync('telphone', telphone)
		}
	}
}
