import request from '@/utils/request.js'


/** 
 * 获取用户信息
 */
export const user = (data) => {
	
	return request.get('/v1/tuser/', data)
}
export const postuser = (data) => {
	
	return request.post('/v1/tuser', data)
}
export const putuser = (data) => {
	return request.put('/v1/tuser/'+data.Id, data)
}
/** 
 * 用户登录
 */
export const login = (data) => {
	return request.get('/v1/tuser/login', data)
}


export const uploadPhoto = (tempFile,data,successCb,errorCb) => {
	return request.uploadPhoto('/v1/tuser/login',tempFile, data,successCb,errorCb)
}

