<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">修改昵称</block>
			<block slot="right"><view style="float: right;"><button class="cu-btn bg-blue" @tap="updateNickName" >确定</button></view></block>
		</cu-custom>
		<view class="cu-form-group">
			<input placeholder="请输入用户昵称"  v-model="nickame" name="input" :focus="true"></input>
			<button class="cu-btn cuIcon-close bg-white" @tap="clearName"></button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				nickame: ''
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onLoad() {
			this.nickame =this.userInfo.Nickname
		},
		methods: {
			clearName() {
				this.nickame =''
			},
			updateNickName() {
					var that = this
					let uInfo = that.userInfo
					uInfo.Nickname = that.nickame
					that.$api.user.putuser({
							...uInfo
						})
						.then(res => {
							if (res.Code == '1') {
								uInfo.Nickname = that.nickame
								that.$store.dispatch('updateUser', uInfo)
								uni.navigateBack()
							} else {
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
