// 管理账号信息
const TOKEN_KEY = 'TOKEN_KEY'
const USER_INFO = 'USER_INFO'
const APPLE_INFO = 'APPLE_INFO'
/**
 * 存储Token
 * @param {string} token
 */
export const setToken = (token) => {
	if (!token) throw '传入的token不能为空';
	uni.setStorageSync(TOKEN_KEY, token);
};
/**
 * 获取Token
 */
export const getToken = () => {
	return uni.getStorageSync(TOKEN_KEY);
};
/**
 * 删除Token
 * @param name
 */
export const removeToken = () => {
	uni.removeStorage(TOKEN_KEY);
};

/**
 * 获取用户信息 
 */
export const getUserInfo = () => {
	console.info("获取用户数据")
	let userInfo = uni.getStorageSync(USER_INFO)
	return userInfo ? JSON.parse(userInfo) : null
}
/**
 * 保存用户信息 
 */
export function setUserInfo(userData) {
	console.info("设置用户信息")
	return uni.setStorageSync(USER_INFO, JSON.stringify(userData))
}
/**
 * 删除用户信息 
 */
export function removeUserInfo() {
	return uni.removeStorageSync(USER_INFO)
}


/**
 * 获取小程序用户信息 
 */
export const getAppletInfo = () => {
	let userInfo = uni.getStorageSync(APPLE_INFO)
	return userInfo ? JSON.parse(userInfo) : null
}
/**
 * 保存小程序用户信息 
 */
export const setAppletInfo = (userData) => {
	return uni.setStorageSync(APPLE_INFO, JSON.stringify(userData))
}
/**
 * 删除小程序用户信息 
 */
export const removeAppletInfo = () => {
	return uni.removeStorageSync(APPLE_INFO)
}
