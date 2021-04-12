<template>
	<view class="wrap">
		<view class="content">
			<view class="title">欢迎登录uni-base</view>
			<input class="u-border-bottom" type="number" v-model="tel" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建账号</view>
			<button @click="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
			<view class="alternative">
				<view class="password">密码登录</view>
				<view class="issue">遇到问题</view>
			</view>
			<template v-if="includesArr(providerList, 'weixin')">
				<u-divider margin-top="20" margin-bottom="20">建议使用微信登录</u-divider>
				<view class="btn-wrapper">
					<u-button type="success" @click="appLogin">
						<u-icon size="50" name="weixin-fill"></u-icon>
						<text style="margin-left: 5rpx;">微信一键登录</text>
					</u-button>
				</view>
			</template>
			<!-- #ifndef APP-PLUS -->
			<view class="col6 t-center mg-tb20 fz16">第三方账号登录</view>
			<view class="fl  mg-t20">
				<image src="../../static/image/wechat.png" mode="" class="img m0" @click="weixinLogin" data-loginType="weixin"></image>
				<image src="../../static/image/qq.png" mode="" class="img m0" @click="qqLogin" data-loginType="qq"></image>
				<image src="../../static/image/weibo.png" mode="" class="img m0" @click="sinaweiboLogin" data-loginType="sinaweibo"></image>
			</view>
			<view class="wrap">
					<u-row gutter="16">
						<u-col span="4">
							<image src="../../static/image/wechat.png" mode="" class="img m0" @click="weixinLogin" data-loginType="weixin"></image>
						</u-col>
						<u-col span="4">
							<image src="../../static/image/qq.png" mode="" class="img m0" @click="qqLogin" data-loginType="qq"></image>
						</u-col>
						<u-col span="4">
							<image src="../../static/image/weibo.png" mode="" class="img m0" @click="sinaweiboLogin" data-loginType="sinaweibo"></image>
						</u-col>
					</u-row>
					</view>
			<!-- 	#endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				tel: ''
			};
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
			console.info("开始了"+this.$store.state.user.hasLogin)
			if (this.$store.state.user.hasLogin) {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			} else {
				this.initProvider();
			}
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
			appLogin() {
				var that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									// 获取用户信息
									that.getApploginData(loginRes) //请求登录接口方法
								}
							});
						}
					}
				});

			},
			getApploginData(data) {
				var that = this
				//这边是前端自己去调微信用户信息的接口，根据接口需要请求，如果不需要前端去获取的话就交给后端，可省去次操作
				uni.request({
					url: "https://api.weixin.qq.com/sns/userinfo?access_token=" + data.authResult.access_token + "&openid=" + data.authResult
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
			// 微信登录
			submit() {
				if (this.$u.test.empty(this.tel)) return;
				if (this.$u.test.mobile(this.tel)) {
					uni.navigateTo({
						url: '/pages/login/code'
					});
				} else {
					this.$common.showToast('手机号码不正确');
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				// background-color: $custom-theme;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}

				&.active {
					color: $u-tips-color;
					background-color: $custom-theme;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.btn-wrapper {}
	}
</style>
