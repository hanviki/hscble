<template>
	<view>
		<cu-custom bgColor="bg-cyan" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">修改身高</block>
			<block slot="right"><view style="float: right;"><button class="cu-btn bg-blue" @tap="updateUserHeight" >确定</button></view></block>
		</cu-custom>
		<view class="cu-form-group">
			<input placeholder="请输入身高" type="number"  v-model="height" name="input" :focus="true"></input>
			<button class="cu-btn cuIcon-close bg-white" @tap="clearName"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: this.$store.getters['user/getUserInfo'].Height,
				userInfo: this.$store.getters['user/getUserInfo']
			}
		},
		onLoad (){
			//this.userInfo =this.$store.getters.getUserInfo
			//this.height =this.userInfo.Height
		},
		methods: {
			clearName() {
				this.height =''
			},
			updateUserHeight() {
					var that = this
					let uInfo = that.userInfo
					let ht= uInfo.height
					uInfo.Height =parseFloat(that.height)
					that.$api.user.putuser({
							...uInfo
						})
						.then(res => {
							if (res.Code == '1') {
							//	uInfo.Height = that.height
								that.$store.dispatch('user/updateUser', uInfo)
								uni.navigateBack()
							} else {
								uInfo.Height =ht
								uni.showToast({
									icon: "none",
									title: "提交数据出错，请联系管理员",
								})
							}
						})
			
				}
			
		}
	}
</script>

<style>

</style>
