import {request,uploadPhoto2} from '@/utils/request.js'
//import uploadPhoto2 from '@/utils/request.js'

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
/** * 发送短信 */export const sendSms = (data) => {	//http://119.45.34.150:8080/v1/tuser/sendsms?phone=13297021213&value=1234	return request.get('/v1/tuser/sendsms',data)}

export const uploadPhoto = (tempFile,successCb,errorCb) => {
	return uploadPhoto2('/v1/tupload/upload',tempFile,successCb,errorCb)
}
/**
 * 第三方登陆 微信\支付宝\微博
 */
export const loginThrid = (data) => {
	return request.post('/v1/tuser/tplogin',  data)
}

export const baseUrl2 = request.config.baseURL

