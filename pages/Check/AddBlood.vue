<template>
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加血糖时间</block>
			<block slot="right">
				<view style="float: right;"><button class="cu-btn bg-blue" @tap="addChuHan">确定</button></view>
			</block>
		</cu-custom>
		<view class="cu-form-group">
			<input placeholder="请输入血糖时间" v-model="chuhan" name="input" :focus="true"></input>
			<button class="cu-btn cuIcon-close bg-white" @tap="clearName"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chuhan: ''
			}
		},
		onLoad(e) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2];
			
		    this.chuhan = beforePage.comments_blood
			
		},
		methods: {
			clearName() {
				this.chuhan = ''
			},
			addChuHan() {
				var pages = getCurrentPages(); //当前页
				var beforePage = pages[pages.length - 2];
			    beforePage.comments_blood = this.chuhan
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
