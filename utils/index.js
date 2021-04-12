/**
 * maybe-uni-js工具函数库
 * @author maybe
 */

/**
 * 函数节流
 * @param {*} fn
 * @param {*} interval
 * @param {*} isImmediate
 */
export function throttle(fn, wait = 500, isImmediate = false) {
	let flag = true;
	let timer = null;
	if (isImmediate) {
		return function() {
			if (flag) {
				fn.apply(this, arguments);
				flag = false;
				timer = setTimeout(() => {
					flag = true;
				}, wait);
			}
		};
	}
	return function() {
		if (flag) {
			flag = false;
			let timer = setTimeout((...rest) => {
				fn.apply(this, rest);
				flag = true;
			}, wait);
		}
	};
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 */
export function debounce(func, wait, immediate) {
	let timer;
	return function() {
		let context = this,
			args = arguments;

		if (timer) clearTimeout(timer);
		if (immediate) {
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timer = setTimeout(() => {
				func.apply;
			}, wait);
		}
	};
}

/**
 * 深拷贝
 * @param {*} obj
 */
export function deepClone(obj) {
	let result = Array.isArray(obj) ? [] : {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'object') {
				result[key] = deepClone(obj[key]); //递归复制
			} else {
				result[key] = obj[key];
			}
		}
	}
	return result;
}
/**
 * 存储localStorage
 * @param name
 * @param content
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	uni.setStorageSync(name, content);
};
/**
 * 获取localStorage
 * @param name
 * @returns {string}
 */
export const getStore = name => {
	if (!name) return;
	return uni.getStorageSync(name);
};
/**
 * 删除localStorage
 * @param name
 */
export const removeStore = key => {
	if (!key) return;
	uni.removeStorage({ key });
};

/**
 * 延迟加载方法
 * @param {Function} fn
 * @param {number} time
 */
export const submitTimeOut = (fn, time) => {
	setTimeout(function() {
		fn();
	}, time);
};
/**
 * 数组插入到Formdata
 * @example 1.在上传多张图片的时候会用到
 * @description 该方法会改变原formdata
 * @param {FormData} formData 源formdata
 * @param {string} key 数组key值
 * @param {Array} arr 数组
 */
export const formatArrToFormData = (formData, key, arr) => {
	arr.forEach((file, index) => {
		formData.append(`${key}[${index}]`, file);
	});
};

/**
 * 数组去重
 * @param arr 需要去重的数组
 */
export const removeArrRepeat = (arr) => {
	return Array.from(new Set(arr));
};
