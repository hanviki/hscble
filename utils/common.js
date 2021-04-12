/**
 * 通用提示框
 // * @param {string} msg 用户信息  
 // * @param {number} delay 延迟毫秒数
 // * @param {string} icon=[success,loading,none] 图标 默认 none
 // * @return {Promise}
 */
export const showToast = (options = '') => {
	let option = {
		delay: 1000,
		icon: 'none',
		msg: '',
		success(){}
	};
	if ( typeof options == 'string') {
		option.msg = options;
	} else {
		option = Object.assign(option, options);
	}
	 uni.showToast({
		 title:option.msg,
		 icon:option.icon
	 })
	setTimeout(()=>{
		option.success()
	},option.delay)
}
