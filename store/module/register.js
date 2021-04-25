export default {
	state: {
		telphone: uni.getStorageSync('telphone'),
		pwd: uni.getStorageSync('password')
	},
	getters: {
		getTelphone: state => state.telphone,
		getPwd: state => state.pwd,
	},
	mutations: {
		setTelphone(state, telphone) {
			console.info("存储:"+telphone)
			state.telphone = telphone
			uni.setStorageSync('telphone', telphone)
		},
		setPwd(state, password) {
			console.info("存储:"+password)
			state.pwd = password
			uni.setStorageSync('password', password)
		}
	}
}
