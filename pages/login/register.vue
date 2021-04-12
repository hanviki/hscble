<template name="basics">
	<view>
		<nav-bar home :bgColor="['#f37402','#0f0']" bgColorAngle="90" :backState="1000" fontColor="#000" title="注册"></nav-bar>
<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	<block slot="backText"></block>
	<block slot="content">注册</block>
</cu-custom>
		<form>
			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap" >
					<view class="basis-xs text-left cuIcon text-xxl text-green">
						<text class="cuIcon-mobile  radius"></text>
					</view>
					<view class="basis-xl bg-white"><input class="textCus" placeholder="请输入手机号" v-model="registerForm.telphone"></input></view>
				</view>
			</view>
			
			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap">
					<view class="basis-cu1 text-left bg-white">
						<input placeholder="请输入验证码" class="textCus" v-model="registerForm.validCode"></input>
					</view>
					<view class="basis-cu2 text-center "><button class="cu-btn bg-green round" @tap="" >发送注册码</button> </view>
				</view>
				
			</view>
			
			<view class="cu-form-group margin-top flex">
				<view class="flex-sub flex flex-wrap">
					<view class="basis-xs text-left cuIcon text-xxl text-green">
						<text class="cuIcon-lock  radius"></text>
					</view>
					<view class="basis-xl bg-white"><input password="" class="textCus" placeholder="请输入密码" v-model="registerForm.password1"></input></view>
				</view>
				
			</view>
			<view class="cu-form-group margin-top flex">
			<view class="flex-sub flex flex-wrap">
				<view class="basis-xs text-left cuIcon text-xxl text-green">
					<text class="cuIcon-lock  radius"></text>
				</view>
				<view class="basis-xl bg-white"><input password="" class="textCus" placeholder="请再次输入密码" v-model="registerForm.password2"></input></view>
			</view>
			</view>
			
			
			<button class="cu-btn block bg-green margin-sm lg" @click="register"> 提交 </button>
			<button class="cu-btn block bg-grey margin-sm lg" @click="goLogin"> 返回登录 </button>
		</form>

	</view>
</template>

<script>
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
		created() {
			
		},
		methods: {
			register() {
				console.log("提交表单", this.registerForm)
				if(this.registerForm.telphone == "" || this.registerForm.password1 == "" || this.registerForm.password2 == "" || this.registerForm.validCode == "") {
					uni.showToast({
						icon: "none",
						title: "请先完善表单~",
					})
					return;
				}

				let passWord = this.registerForm.password1;
				let passWord2 = this.registerForm.password2;
				if(passWord != passWord2) {
					uni.showToast({
						icon: "none",
						title: "两次密码不一致~",
					})
					return;
				}
				var params = {};
				params.userName = this.registerForm.userName;
				params.passWord = this.registerForm.password1;
				params.email = this.registerForm.email;
				params.nickName = this.registerForm.nickName
				// localRegister(params).then(response => {
				//   if (response.code == this.$ECode.SUCCESS) {
				// 	uni.showToast({
				// 		icon: "success",
				// 		title: response.data,
				// 	})
				// 	// 打开登录页面
				// 	this.goLogin();
				//   } else {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: response.data,
				// 	})
				//   }
				// });
			},
			goLogin() {
				console.log("跳转到登录页面")
				uni.navigateTo({
					url: '/pages/Check/CheckAdd',
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

.textCus{
	font-size: 20px!important;
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
