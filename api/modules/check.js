import request from '@/utils/request.js'


/** 
 * 新增检测信息
 */
export const add = (data) => {
	
	return request.post('/v1/tuser', data)
}
