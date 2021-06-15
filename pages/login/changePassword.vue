<template name="basics">
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">忘记密码</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top flex">

				<view class="basis-xs text-left cuIcon text-xl text-green">
					<text class="cuIcon-mobile  radius"></text>
				</view>
				<view class="basis-xl bg-white text-xxl"><input placeholder="请输入手机号"
						v-model="registerForm.telphone"></input></view>

			</view>

			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap">
					<view class="basis-cu1 text-left bg-white text-sm">
						<verification-code @Confirm='vcodeInput' inputType="number" :autoFocus="false" :itemNumber="4"
							:isPassword="false" class="activation-code" type="line">
						</verification-code>
					</view>
					<view class="basis-cu2 text-center "><button class="cu-btn bg-gray  round text-sm"
							@tap="sendSms()">获取注册码</button> </view>
				</view>

			</view>

			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap">
					<view class="basis-xs text-left cuIcon text-xl text-green">
						<text class="cuIcon-lock  radius"></text>
					</view>
					<view class="basis-xl bg-white"><input password="" placeholder="请输入6-20新密码"
							v-model="registerForm.password1"></input></view>
				</view>

			</view>
			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap">
					<view class="basis-xs text-left cuIcon text-xl text-green">
						<text class="cuIcon-lock  radius"></text>
					</view>
					<view class="basis-xl bg-white"><input password="" placeholder="请再次输入新密码"
							v-model="registerForm.password2"></input></view>
				</view>
			</view>


			<button class="cu-btn block  margin-sm lg text-white" @tap="updatePassWord" style="background-color: #1CBBB4;"> 提交 </button>
			<!-- <button class="cu-btn block  margin-sm lg" @tap="goLogin"> 返回登录 </button> -->
		</form>
		<view class="bg-img padding-top-xl flex align-end "
			style="background-image: url('../../static/image/login.jpg');height: 440upx; width: 100%; ">

		</view>
	</view>
</template>

<script>
	import verificationCode from '@/components/verification-code/verification-code.vue';
	export default {
		name: "login",
		data() {
			return {
				imgList: [],
				registerForm: {
					telphone: "",
					validCode: "",
					password1: "",
					password2: ""
				}
			}
		},
		components: {
			verificationCode
		},
		created() {

		},
		methods: {
			//验证码
			getValidCode() {
				var str = '0123456789';
				var res = '';
				for (var i = 0; i < 4; i++) {
					//随机产生字符串的下标
					var n = parseInt(Math.random() * str.length)
					res += str[n]
				}
				console.log(res)
				return res
			},
			vcodeInput(val) {
				this.registerForm.validCode = val;
			},
			updatePassWord() {
				var that = this
				let loginRules = [{
						name: 'telphone',
						required: true,
						type: 'phone',
						errmsg: '请输入正确的手机号'
					},
					{
						name: 'password1',
						type: 'required',
						min: 6,
						max: 16,
						errmsg: '请输入密码'
					},
					{
						name: 'password1',
						type: 'pwd',
						errmsg: '密码须是6～16位字符'
					},
					{
						name: 'password2',
						type: 'eq',
						eqName: 'password1',
						min: 6,
						max: 16,
						required: true,
						errmsg: '两次输入密码不一致'
					},
					{
						name: 'validCode',
						type: 'required',
						errmsg: '请输入验证码'
					},
					{
						name: 'validCode',
						type: 'lengthRange',
						min: 4,
						max: 4,
						errmsg: '请正确输入验证码'
					}
				]
				let valLoginRes = this.$validate.validate(this.registerForm, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
					return false
				}
				if (this.validCode != this.registerForm.validCode) {
					uni.showToast({
						icon: 'none',
						title: '验证码输入有误'
					})
					return false
				}
				var params={}
				params.phone= that.registerForm.telphone
				params.password =that.registerForm.password1
				that.$api.user.putPassWord({
						params: params
					})
					.then(res => {
						console.info(res)
						if (res.Code == '1') {
							uni.showToast({
								icon: "none",
								title: "密码修改成功,请重新登陆"
							})
							uni.navigateBack()
						} else {
							uni.showToast({
								icon: "none",
								title: "修改密码失败，请联系管理员",
							})
						}
					})

			},
			sendSms() {

				if (!this.$validate.isPhone(this.registerForm.telphone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
					return
				}
				this.validCode = this.getValidCode()

				if (this.registerForm.telphone != '') {
					let params = {
						phone: this.registerForm.telphone,
						value: this.validCode
					}
					this.$api.user.sendsmsfindpwd({
						params: params
					}).then((res) => {
						if (res.Message == "手机号未注册") {
							uni.showToast({
								icon: "none",
								title: "手机号未注册",
							})
						} else {
							if (res.Code == '1') {
								uni.showToast({
									icon: "none",
									title: "短信已发送,请接收",
								})
							}
						}
					})
				}
			},
			goLogin() {
				console.log("跳转到登录页面")
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
		}
	}
</script>


<style scoped>
	.page {
		height: 100vh;
	}

	.UCenter-bg {
		background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
		background-size: cover;
		height: 400rpx;
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

	.textCus {
		font-size: 20px !important;
	}

	.basis-cu1 {
		-webkit-flex-basis: 70%;
		flex-basis: 70%;
	}

	.basis-cu2 {
		-webkit-flex-basis: 30%;
		flex-basis: 30%;
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
