<template>
	<view>
		<cu-custom bgColor="bg-cyan" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">修改体重</block>
			<block slot="right"><view style="float: right;"><button class="cu-btn bg-blue" @tap="updateUserWeight" >确定</button></view></block>
		</cu-custom>
		<view class="cu-form-group">
			<input placeholder="请输入体重" type="number"  v-model="height" name="input" :focus="true"></input>
			<button class="cu-btn cuIcon-close bg-white" @tap="clearName"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				userInfo: {}
			}
		},
		onLoad() {
			this.height= this.$store.getters['user/getUserInfo'].Weight
			this.userInfo= this.$store.getters['user/getUserInfo']
		},
		methods: {
			clearName() {
				this.height =''
			},
			updateUserWeight() {
					var that = this
					let uInfo = that.userInfo
					let wt= uInfo.Weight
					uInfo.Weight = parseFloat(that.height)
					that.$api.user.putuser({
							...uInfo
						})
						.then(res => {
							if (res.Code == '1') {
								//uInfo.Weight = that.height
								that.$store.dispatch('user/updateUser', uInfo)
								uni.navigateBack()
							} else {
								uInfo.Weight =wt
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
