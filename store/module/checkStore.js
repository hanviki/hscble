//设置 是否做过保存血糖和出汗
export default {
	state: {
		isSave: uni.getStorageSync('isSave') || 0, // 是否保存了血糖和出汗
		totalData: uni.getStorageSync('totalData') || [], // 已经存储的
		totalCount: uni.getStorageSync('totalCount') || 0, //总共组数
		dataCount: uni.getStorageSync('dataCount') || 0, //当前组数
		packageNum: uni.getStorageSync('packageNum') || 0, //当前包数
	},
	getters: {
		getIsSave: state => state.isSave,
		getTotalCount: state => state.totalCount,
		getDataCount: state => state.dataCount,
		getPackageNum: state => state.packageNum,
		getTotalData: state => state.totalData
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
		},
		setTotalCount(state, totalCount) {
			state.totalCount = totalCount
			uni.setStorageSync('totalCount', totalCount)
		},
		setDataCount(state, dataCount) {
			state.dataCount = dataCount
			uni.setStorageSync('dataCount', dataCount)
		},
		setPackageNum(state, packageNum) {
			state.packageNum = packageNum
			uni.setStorageSync('packageNum', packageNum)
		},
		setTotalData(state, totalData) {
			state.totalData = totalData
			uni.setStorageSync('totalData', totalData)
		}
	},
	actions: {
		async doSetting({
			dispatch,
			commit,
			state
		}, value) {
			commit('setIsSave', value)
		},
		async doTotalCount({
			dispatch,
			commit,
			state
		}, value) {
			commit('setTotalCount', value)
		},
		async doPackageNum({
			dispatch,
			commit,
			state
		}, value) {
			commit('setPackageNum', value)
		},
		async doDataCount({
			dispatch,
			commit,
			state
		}, value) {
			commit('setDataCount', value)
		},
		async doTotalData({
			dispatch,
			commit,
			state
		}, value) {
			commit('setTotalData', value)
		},
	}
}
