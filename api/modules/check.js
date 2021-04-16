import request from '@/utils/request.js'


/** 
 * 新增检测信息
 */
export const addsweat= (data) => {
	return request.post('/v1/tsweat', data)
}
export const addsweatsugar= (data) => {
	return request.post('/v1/bloodsugar', data)
}
export const addbloodsugar= (data) => {
	return request.post('/v1/sweatsugar', data)
}
/**
 * 获取信息
 */
export const reportCheck = (data) => {
	return request.get('/v1/tuser/report/'+data.userId, data)
}
