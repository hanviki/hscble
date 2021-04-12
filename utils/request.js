/* 
  http 请求封装
  @author maybe
 */

//  导入封装的request框架
import Http from '@/js_sdk/luch-request/luch-request/index.js'

import {
	getToken
} from './auth'
const request = new Http()
// 环境前缀添加
let baseURL = null;
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseURL = 'http://119.45.34.150:8080/'
} else {
	// 生产环境
	// baseURL = 'https://movie.lzzzero.com/api'
}
request.config.baseURL = baseURL



// 错误弹框提示
const errorToast = (msg) => {
	uni.showToast({
		title: msg || 'fetch data error.',
		icon: 'none'
	})
}
/**
 * 自定义响应错误逻辑
 */
const handleCustomError = (res) => {
	switch (res.code) {
		case 5001:
			// 自定义错误逻辑处理
			console.log('code:5001 自定义错误逻辑处理')
			break;
		default:
			errorToast(res.msg)
			break;
	}
}

request.interceptors.request.use((config) => {
	let token = getToken();
	console.info("token:"+ token)
	if (token) {
		config.header['token'] = token;
	}
	console.log(config)

	uni.showNavigationBarLoading()
	return config
})

request.interceptors.response.use((response) => {
	uni.hideNavigationBarLoading()
	console.log(response)
	//  服务器正确响应拦截逻辑处理 

	//  code = 200 是逻辑正确响应的状态码可自行修改
	if ( response.statusCode !== 200) {
		handleCustomError(response);
		return Promise.reject(new Error(response.msg))
	}
	
	return Promise.resolve(response.data)
}, (err) => {
	uni.hideNavigationBarLoading()
	errorToast(err.errMsg)
	return  Promise.reject(new Error(err.errMsg))
})


export default request

// 创建新的实例请求对象
export const create = () => {
	return new Http();
}


/**
 * 上传图片
 * @param {string} url  
 * @param {Function} successCb
 * @param {number} maxCount  
 * @param {Function} errorCb  
 */
export const uploadImage = (url, successCb, maxCount = 1, errorCb) => {
	let token = getToken()
	uni.chooseImage({
		count: maxCount,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: baseURL + url,
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					header: {
						'token': token
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						successCb(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							errorToast(error.response);
							errorCb && errorCb(error.response)
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}
