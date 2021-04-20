<template name="basics">
	<view>

		<view class="UCenter-bg">
			<view class="text-xl" style="margin-top: 5px;">
				蘑菇博客
			</view>

		</view>

		<form>
			<view class="cu-form-group margin-top">
				<input placeholder="请输入用户名或手机号" v-model="loginForm.userName"></input>
			</view>

			<view class="cu-form-group margin-top">
				<input password="" placeholder="请输入密码" v-model="loginForm.password"></input>
			</view>

			<button class="cu-btn block bg-green margin-sm lg" @tap="login"> 登录 </button>
			<button class="cu-btn block bg-grey margin-sm lg" @tap="goRegister"> 注册账号 </button>
		</form>
		<view class="bg-white">
			<view class="grid margin-bottom text-center col-3 ">
				<view class="flex flex-wrap align-center">
					<button class="flex-sub  bg-white cu-btn cuIcon text-xxl text-green" @tap="appLogin('weixin')">
						<text class="cuIcon-weixin radius"></text>
					</button>
				</view>
				<view class="flex flex-wrap align-center">
					<button class="flex-sub  bg-white cu-btn cuIcon text-xxl text-red" @tap="appLogin('sinaweibo')">
						<text class="cuIcon-weibo  radius"></text>
					</button>
				</view>
				<view class="flex flex-wrap align-center">
					<button class="flex-sub  bg-white cu-btn cuIcon text-xxl text-blue" @tap="appLogin('zhifubao')">
						<text class="cuIcon-zhifubao radius"></text>
					</button>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				tel: '',
				loginForm: {
					userName: "",
					password: "",
				}
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = '#fff';
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		watch: {},
		onLoad() {
			console.info("开始了" + this.$store.getters['user/getHasLogin'])
			if (this.$store.getters['user/getHasLogin']) {  //注释 登陆过直接登陆
				uni.switchTab({
					url: '/pages/settings/settings'
				});
			} else {
				this.initProvider();
			}
			this.initProvider();
		},
		methods: {
			includesArr(arr, val) {
				return arr.includes(val);
			},
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: res => {
						if (res.provider && res.provider.length) {
							this.providerList = [...res.provider];
						}
					},
					fail: err => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},

			appLogin(loginType) {
				var that = this
				if(loginType=='zhifubao'){
					this.loginByAlipay()
				}
				else {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin') || ~res.provider.indexOf('qq') || ~res.provider.indexOf('sinaweibo')) {

							uni.login({
								provider: loginType,
								success: res => {
									var access_token = '';
									access_token = res.authResult.access_token;
									// 3 授权登录成功以后，获取用户的信息
									uni.getUserInfo({
										provider: loginType,
										success: function(infoRes) {
											let formdata = {};
											if (loginType == "weixin") {
												formdata = {
													nickname: infoRes.userInfo.nickName,
													sexy: infoRes.userInfo.gender=1?'1':'2',
													photo: infoRes.userInfo.avatarUrl,
													openId: infoRes.userInfo.openId,
													unionId: infoRes.userInfo.unionId,
													access_token: access_token,
													appLoginType: 'WEIXIN',
													source: 'wx'+infoRes.userInfo.openId,
													sourcetype: '1'
												};
											} else if (loginType == "qq") {
												formdata = {
													Nickname: infoRes.userInfo.nickname,
													Sexy: infoRes.userInfo.gender == '男' ? 1 : 2,
													Photo: infoRes.userInfo.figureurl_qq_2,
													openId: infoRes.userInfo.openId,
													unionId: '',
													access_token: access_token,
													appLoginType: 'QQ'
												};
											} else if (loginType == "sinaweibo") {
												formdata = {
													nickname: infoRes.userInfo.nickname,
													sexy: infoRes.userInfo.gender == 'm' ? '1' : '2',
													photo: infoRes.userInfo.avatar_large,
													openId: infoRes.userInfo.id,
													unionId: '',
													access_token: access_token,
													appLoginType: 'SINAWEIBO',
													source: 'sina'+infoRes.userInfo.id,
													sourcetype: '2'
												};
											}
											
											that.$store.dispatch('user/thirdLogin', formdata)
										}

									})
								}
							});

						}
					}
				})
				}
			},
			loginByAlipay() {
				this.getAlipayCode().then((code) => {
					console.info(code)
					return uniCloud.callFunction({
						name: 'uni-id-test',
						data: {
							action: 'loginByAlipay',
							params: {
								code,
							}
						}
					})
				}).then((res) => {
					console.info(res)
				}).catch((e) => {
					console.error(e)
					uni.showModal({
						showCancel: false,
						content: '支付宝登录失败，请稍后再试'
					})
				})
			},
			getAlipayCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'alipay',
						success(res) {
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('支付宝登录失败'))
						}
					})
				})
			},
			getApploginData(data) {
				var that = this
				//这边是前端自己去调微信用户信息的接口，根据接口需要请求，如果不需要前端去获取的话就交给后端，可省去次操作
				uni.request({
					url: "https://api.weixin.qq.com/sns/userinfo?access_token=" + data.authResult.access_token + "&openid=" +
						data.authResult
						.openid,
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					success(res) {
						console.log('【登录回调啾啾啾】', res)

						that.$store.dispatch('user/login', {
							username: res.data.nickName
						});
						that.$common.showToast({
							msg: '登录成功',
							success() {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						});
					},
					fail() {}
				})
			},
			// 表单登录
			login() {
				var that = this
				console.log("提交表单", this.loginForm)
				if (that.loginForm.userName == "" || that.loginForm.password == "") {
					uni.showToast({
						icon: "none",
						title: "请填写用户名或密码",
					})
					return;
				}
				var params = {};
				params.username = that.loginForm.userName;
				params.password = that.loginForm.password;
				that.$store.dispatch('user/login', {
					params: params
				})
				console.info("zheli了" + this.$store.state.user.hasLogin)
			},
			goRegister() {
				console.log("跳转到注册页面")
				uni.navigateTo({
					url: '/pages/login/register'
				});
			}
		},

	};
</script>
<style scoped>
	.page {
		height: 100vh;
	}

	.UCenter-bg {
		/* background-image: url(../../static/images/bg.jpg); */
		background-size: cover;
		height: 350rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}
</style>
