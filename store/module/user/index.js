import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as $userApi from '@/api/modules/user'
import {
	USER_LOGIN,
	USER_LOGUT
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
		token: null,
		userInfo: {},
		appletInfo: {}
	},
	mutations: {
		[USER_LOGIN](state, {
			userInfo,
			token
		}) {
			state.userInfo = userInfo;
			state.token=token
			setToken(token)
			setUserInfo(userInfo)
			state.hasLogin = true;
		},
		[USER_LOGUT](state) {
			state.userInfo = {};
			state.appletInfo = {};
			state.token=null;
			setToken("")
			setUserInfo(null)
			state.hasLogin = false;
		}
	},
	actions: {
		async login({
			commit,
			state
		}, data) {
			try {
			 $userApi.login(data).then(loginResult=>{
				 console.info("hhhhhhhhh")
				 if(loginResult.Code=="1"){
				 	console.info(loginResult.Message)
				 // setToken(result.data.token)
				 commit(USER_LOGIN, {
				 	userInfo: null,
				 	token: loginResult.Message
				 })
				 
				
				 setTimeout(()=>{
				 	$userApi.user({params:{Id:loginResult.Code}}).then(userResult=>{
				 						 commit(USER_LOGIN, {
				 						 	userInfo: userResult.data,
				 							token: loginResult.Message
				 						 })
				 	})
				 },1000);
				 // setUserInfo(userInfo.data)
				 }
				 else{
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
			commit
		}) {
			commit(USER_LOGUT)
			uni.reLaunch({
				url: "/pages/login/login"
			})
		}
	}
}

export default store
