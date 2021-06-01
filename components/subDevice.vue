<template>
	<view>
		<!-- B 已配对设备列表 -->
		<view class="padding-top padding-bottom text-center" v-if="paired.length == 0 && isOpenBle">暂无设备</view>

		<scroll-view v-else scroll-y="true" show-scrollbar="true">
			<view class="r margin-top-sm bg-cyan light" v-for="(item, index) in paired" :key="index"
				@tap.stop="dispatch('createBLEConnection', item)" @longpress="longpress(item)">
				<view class="flex">
					<view style="flex-basis: 30%;" class="padding-sm text-center text-xsl">
						<text class="cuIcon-rankfill text-green"></text>
					</view>
					<view style="flex-basis: 70%;" class="padding-sm radius  text-center justify-center">
						<view class="text-black">
							{{item.name}}
						</view>
						<view class="flex margin-top-sm">
							<view class="flex-sub text-gray" >
								{{item.status?'已连接':'已断开'}}</view>
							<view class="flex-sub" v-if="!item.status">
								<text class="text-green" @tap.stop="dispatch('createBLEConnection', item)">重新连接</text>
							</view>
							<view class="flex-sub" v-if="item.status">
								<text class="text-green" @tap.stop="dispatch('disconnect', item)">断开</text>
							</view>
							<view class="flex-sub">
								<text class="text-green" @tap.stop="dispatch('delpaired', item)">移除设备</text>
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>

		<view class="text-center">
			<text class="text-green" @tap="openAdd">添加设备</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'bluetooth',
		data() {
			return {
				isOpenBle: this.$store.getters.getIsOpenBle, // 是否开启蓝牙
				paired: this.$store.getters.getPaired, // 已配对设备列表
				bledd: this.$store.getters.getBledd, // 是否启用蓝牙搜索
				devicesList: this.$store.getters.getDevicesList, // 可用设备列表
				manufacturer: this.$store.getters.getManufacturer // 厂商设备
			};
		},
		props: {
			drawer: {
				type: String
			}
		},
		watch: {
			'$store.state.bluetooth': {
				handler(e) {
					console.info('33333333')
					this.isOpenBle = e.isOpenBle;
					this.paired = e.paired;
					this.bledd = e.bledd;
					this.devicesList = e.devicesList;
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 打开蓝牙
			openBle(e) {
				!this.isOpenBle ? this.dispatch('openBluetoothAdapter') : this.dispatch('closeBluetoothAdapter');
			},
			// 使用store的函数
			dispatch(name, item) {
				this.$store.dispatch(name, item);
			},
			// 长按操作
			longpress(item) {
				// 如果无连接执行删除
				if (item.status) {
					this.$emit('longpress', item);
				} else {
					this.dispatch('delpaired', item);
				}
			},
			openSetting(index) {
				this.$emit('openSetting', index);
			},
			openAdd() {
				uni.navigateTo({
					url: '/pages/settings/addDevice'
				})
			}
		}
	};
</script>

<style>
	.r {
		border-radius: 30rpx;
	}
</style>
