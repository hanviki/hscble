/* 
  http 请求封装
  @author maybe
 */

//  导入封装的request框架
import Http from '@/js_sdk/luch-request/luch-request/index.js'

import {
	getToken
} from './auth'
export const request = new Http({
	timeout: 300000 //超时时长5分钟
})
// 环境前缀添加
let baseURL = null;
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseURL = 'http://1.15.180.40:80/'
	//baseURL = 'http://119.45.34.150:8080/'

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
	console.info(res)
	switch (res.statusCode) {
		case 404:
		        console.info('很抱歉，资源未找到')
				errorToast('很抱歉，资源未找到')
		        break
		      case 403:
		      case 401:
		        errorToast('很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效')
		        break
		default:
			errorToast(res.msg)
			break;
	}
}


request.interceptors.request.use((config) => {
	let token = getToken();
	console.info(config)
	if (token && config.url!='/v1/tuser/login' && config.url!='/v1/tuser/sendsms') {
		config.header['Authorization'] = token;
	}
	console.log(config)
   
	uni.showNavigationBarLoading()
	return config
})

request.interceptors.response.use((response) => {
	uni.hideNavigationBarLoading()
	//console.log(response)
	//  服务器正确响应拦截逻辑处理 
	//  code = 200 是逻辑正确响应的状态码可自行修改
	if ( response.statusCode !== 200) {
		//handleCustomError(response);
		return Promise.reject(new Error(response.msg))
	}
	
	return Promise.resolve(response.data)
}, (err) => {
	uni.hideNavigationBarLoading()
	
	handleCustomError(err)
	//errorToast(err.errMsg)
	return  Promise.reject(new Error(err.errMsg))
})


//export default request

// 创建新的实例请求对象
export const create = () => {
	return new Http();
}
/**
 * 上传头像
 */
export const uploadPhoto2 = (url, tempFilePaths ,successCb,errorCb)=>{
	let token = getToken()
	uni.showLoading({
		title: '上传中...'
	});
	uni.uploadFile({
		url: baseURL + url,
		filePath: tempFilePaths,
		fileType: 'image',
		name: 'myfile',
		header: {
			'Authorization': token
		},
		formData: {
			'method': 'images.upload',
			'myfile': tempFilePaths
		},
		success: (uploadFileRes) => {
			console.info(uploadFileRes)
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
