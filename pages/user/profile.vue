<template name="basics">
	<view style="height: 100vh;" class="bg-white">
		<cu-custom bgColor="bg-cyan" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<view class="text-center">
			<view class="padding-xl"></view>
			<view class="cu-avatar-group">
				<view class="cu-avatar round xl"  :style="[{ backgroundImage:'url(' + userInfo.Photo+ ')' }]"></view>
			</view>
			<view class="padding-bottom-sm text-black">{{ userInfo.Nickname }}</view>
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
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap.stop="open">
				<navigator class="content" hover-class="none" url="../user/userInfo" open-type="navigate">
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
				<navigator class="content" hover-class="none" url="" open-type="redirect">
					<text class="cuIcon-info text-orange"></text>
					<text class="text-grey">关于</text>
				</navigator>
			</view>
			
		</view>
		<view class=" text-center  cu-bar btm  padding-xl">
			<button class="round bg-cyan" @tap="bindLogout">退出登录</button>
		</view>
		</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { USER_LOGUT} from '@/store/module/user/mutations-type.js';
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
		onLoad() {
			this.pic =this.userInfo.Photo
		},
		
		methods: {
			bindLogout() {
				 this.$store.dispatch('user/logout');
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				
					// uni.reLaunch({
					// 	url: '../login/login'
					// });
				
			},
			open () {
				uni.navigateTo({
					url: '/pages/user/userInfo'
				})
			},
		}
	}
</script>

<style>
  .btm {
	  position: fixed;
	      width: 100%;
	      bottom: 0;
	      z-index: 1024;
  }
  .cu-list.menu>.cu-item:hover{
        background-color:#91CB74
  		}
		
</style>
