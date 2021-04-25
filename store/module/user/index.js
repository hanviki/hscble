import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as $userApi from '@/api/modules/user'
import {
	USER_LOGIN,
	USER_LOGUT,
	USER_UPDATE,
	LOGIN_STATUS
} from './mutations-type'
import {
	setUserInfo,
	getUserInfo,
	setToken,
	getToken,
	removeToken,
	removeUserInfo,
	getAppletInfo
} from '@/utils/auth'

const store = {
	// 命名空间
	namespaced: true,
	state: {
		hasLogin: false,
		token: getToken() || null,
		userInfo: getUserInfo() || {},
		appletInfo:getAppletInfo() || {}
	},
	getters: {
		getHasLogin: (state)=>{
			return state.hasLogin
		},
		getToken: (state)=>{
			return state.token
		},
		getUserInfo: (state) => {
			return state.userInfo
		},
		getAppletInfo: (state) => {
			return state.appletInfo
		}
	},
	mutations: {
		[USER_LOGIN](state, {
			userInfo,
			token
		}) {
			console.info("保存数据：");
			console.info(userInfo)
			state.userInfo = userInfo;
			state.hasLogin = true;
			setUserInfo(userInfo);
			state.token = token;
			setToken(token);
		},
		[USER_LOGUT](state) {
			state.userInfo = {};
			state.appletInfo = {};
			state.token = null;
			setToken({})
			setUserInfo(null)
			state.hasLogin = false;
		},
		[USER_UPDATE](state, userInfo) {
			setUserInfo(userInfo)
		},
		[LOGIN_STATUS](state) {
			state.hasLogin = true
		},
	},
	actions: {
		async login({
			commit,
			state
		}, data) {
			try {
				$userApi.login(data).then(loginResult => {
					// console.info("hhhhhhhhh")
					if (loginResult.Code == "1") {
						//	console.info(loginResult.Message)
						// setToken(result.data.token)
						commit(USER_LOGIN, {
							userInfo: loginResult.Data[0],
							token: loginResult.Message
						})
						uni.reLaunch({
							url: "/pages/Check/Check"
						})
						// setUserInfo(userInfo.data)
					} else {
						uni.showToast({
							icon: "none",
							title: loginResult.Message,
						})
						return;
					}
				})

			} catch (e) {
				//TODO handle the exception
				// 如果token和用户信息有任意一个流程出错则整个逻辑回滚
				// removeToken();
				// removeUserInfo();
				commit(USER_LOGUT)
				//在 async 的 catch 中 必须显示返回Promise.reject 不然会包装成Promise.reslove
				return Promise.reject(e);
			}
		},
		/**
		 * 第三方登陆
		 */
		thirdLogin({
			commit,
			state
		}, data) {
			try {
				$userApi.loginThrid(data).then(loginResult => {
					// console.info("hhhhhhhhh")
					if (loginResult.Code == "1") {
						//	console.info(loginResult.Message)
						// setToken(result.data.token)
						commit(USER_LOGIN, {
							userInfo: loginResult.Data[0],
							token: loginResult.Message
						})
						uni.reLaunch({
							url: "/pages/Check/Check"
						})
						// setUserInfo(userInfo.data)
					} else {
						uni.showToast({
							icon: "none",
							title: loginResult.Message,
						})
						return;
					}
				})

			} catch (e) {
				//TODO handle the exception
				// 如果token和用户信息有任意一个流程出错则整个逻辑回滚
				// removeToken();
				// removeUserInfo();
				commit(USER_LOGUT)
				//在 async 的 catch 中 必须显示返回Promise.reject 不然会包装成Promise.reslove
				return Promise.reject(e);
			}
		},
		logout({
			commit,
			state
		}) {
			console.info(3333333333)
			commit(USER_LOGUT)
			uni.reLaunch({
				url: "/pages/login/login"
			})
		},
	    updateUser({
			commit,
			state
		}, userInfo) {
			commit(USER_UPDATE, {
				userInfo: userInfo
			})
		},
		updateStatus({
			commit,
			state
		}, userInfo) {
			commit(LOGIN_STATUS)
		}
	
	}
}

export default store
