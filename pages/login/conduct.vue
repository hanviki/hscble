<template>
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">健康档案</block>
		</cu-custom>
		<view class="cu-card bg-white">
			<view class="bg-gray cu-item" @tap.stop="redirect">
				<view class="cu-list  menu-avatar">
					<view class="shadow bg-gray cu-item" style="background-color: #F0F0F0;">
						<view class="cu-avatar cu-icon cuIcon-my round lg">

						</view>
						<view class="content flex" style=" height: 67px; ">
							<view class="text-gray flex-sub flex justify-center align-center text-center"
								style="font-size: 21px;">
								基本信息
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-gray cu-item">
				<view class="cu-list  menu-avatar">
					<view class="shadow bg-gray cu-item" style="background-color: #F0F0F0;">
						<view class="cu-avatar round lg">
						</view>
						<view class="content flex" style=" height: 67px; ">
							<view class="text-gray flex-sub flex justify-center align-center text-center"
								style="font-size: 21px;">

							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-gray cu-item">
				<view class="cu-list  menu-avatar">
					<view class="shadow bg-gray cu-item" style="background-color: #F0F0F0;">
						<view class="cu-avatar round lg">
						</view>
						<view class="content flex" style=" height: 67px; ">
							<view class="text-gray flex-sub flex justify-center align-center text-center"
								style="font-size: 21px;">

							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	     <view class="bg-img padding-top-xl flex align-end " style="background-image: url('../../static/image/register.jpg');height: 440upx;">
	     	<view class="bg-shadeBottom padding padding-top-xl flex-sub">
	     	</view>
	     </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			redirect() {
				uni.navigateTo({
					url: '/pages/user/user'
				})
			}
		}
	}
</script>

<style>
	.cuH {
		height: 67px;
	}
</style>
