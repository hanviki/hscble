import request from '@/utils/request.js'


/** 
 * 获取用户信息
 */
export const user = (data) => {
	return request.get('/v1/tuser', data)
}
/** 
 * 用户登录
 */
export const login = (data) => {
	return request.get('/v1/tuser/login', data)
}
