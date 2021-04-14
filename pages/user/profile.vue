<template name="basics">
	<view>
		<view class="bg-cyan text-center">
			<view class="padding-xl"></view>
			<view class="cu-avatar-group">
				<view class="cu-avatar round xl"  :style="[{ backgroundImage:'url(' + pic+ ')' }]"></view>
			</view>
			<view class="padding-bottom-sm text-black">{{ userInfo.name==null?'张三':'历史' }}</view>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-text text-grey"></text>
					<text class="text-grey">周月年报</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/image/zhexian.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的数据</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-myfill text-orange"></text>
					<text class="text-grey">个人资料</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-settings text-pink"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-info text-orange"></text>
					<text class="text-grey">关于</text>
				</navigator>
			</view>
			<view class="margin-tb-sm text-center">
				<button class="cu-btn round bg-cyan" @tap="bindLogout">退出登录</button>
			</view>
		</view>
		</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				//右边箭头
				menuArrow: true,
				pic: 'https://imgsa.baidu.com/forum/pic/item/2f9abdec8a13632792d21683988fa0ec08fac70d.jpg',
			}
		},
		computed:{
			...mapState({
				 userInfo: state => state.user.userInfo
			})
		},
		methods: {
			bindLogout() {
				this.$store.dispatch('user/logout');
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login'
					});
				}
			}
		}
	}
</script>

<style>

</style>
