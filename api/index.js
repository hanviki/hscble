import * as user from './modules/user.js'
import * as check from './modules/check.js'
export default {
	user,  //.vue文件中 this.$api.user 调用该模块
	check  //.vue文件中 this.$api.check 调用该模块 检测模块
}