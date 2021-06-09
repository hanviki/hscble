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
							<view class="flex-sub text-gray">
								{{item.status?'已连接':'已断开'}}
							</view>
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
					   <view class="text-gray margin-top-sm">
							电量:{{item.elect==undefined?'':item.elect}}
						</view>
					</view>
				</view>
			</view>

		</scroll-view>

		<view class="text-center">
			<text class="text-green" @tap.stop="openAdd">添加设备</text>
		</view>
	</view>
</template>

<script>
	import Bluetooth from '@/common/bluetooth.js';
	let bluetooth = new Bluetooth();
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
		created() {
			uni.$on('handleElec',(item)=>{
				setTimeout(() => {
				this.getElectic(item)
				},2000);
			});
		},
		watch: {
			'$store.state.bluetooth': {
				handler(e) {
					console.info('6666')
					this.isOpenBle = e.isOpenBle;
					this.paired = e.paired;
					this.bledd = e.bledd;
					this.devicesList = e.devicesList;
					let that = this

					if (e.paired != null && e.paired.length > 0) {
						for (var i = 0; i < e.paired.length; i++) {
							if (e.paired[i].status) {
								var item = that.paired[i]
								setTimeout(() => {
									uni.$emit('handleElec',item)
									//that.getElectic(item)
								}, 200)
							}
						}
					}
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
			},
			 getElectic(item) {
				console.info(item)
				let that = this
                that.electricStr=''
				let manufacturer = that.manufacturer
				console.info(manufacturer)
			    bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer[0].serviceId,
						manufacturer[0].characteristicId).then((res2) => {
						console.info(344232323)
						uni.onBLECharacteristicValueChange(function(res) {
								console.info(44444444444)
								let str = bluetooth.ab2hex(res.value)
								//01 03 0F D1 00 01 00 E5
								if (str.indexOf('01030200') == 0) { // 组命令获取
									that.electricStr += str
									setTimeout(() => {
										var elcStr = that.electricStr.substr(8, 2)
										that.$set(item, 'elect',  parseInt(elcStr, 16) +
											'%');
										//that.paired[that.pairedIndex]["elect"] = 
									}, 300)
								}
							
							});
						
					});
					setTimeout(() => {
                	console.info(manufacturer[1])
                	that.$store.dispatch('writeManufacturer', {
                		item,
                		manufacturer: manufacturer[1],
                		writeCode: '01030FD1000100E5',
                		index: 0
                	}).then(res => {
                		console.info('0000')
                	});
                }, 500);
			}
		}


	};
</script>

<style>
	.r {
		border-radius: 30rpx;
	}
</style>
