<template>
	<view>
		<cu-custom bgColor="bg-cyan" :isBack="false">
			<block slot="content">设备</block>
		</cu-custom>
		<view class="bg-gray text-black padding-xl">
			<!-- B 已配对设备列表 -->
			<view class="padding-top padding-bottom text-center" v-if="paired.length == 0 && isOpenBle">暂无设备</view>

			<scroll-view v-else scroll-y="true" show-scrollbar="true">
				<view class="r margin-top-sm bg-cyan light" v-for="(item, index) in paired" :key="index"
					@tap.stop="dispatch('createBLEConnection', item)" @longpress="longpress(item)">
					<view class="flex">
						<view style="flex-basis: 30%;" class="padding-sm text-center text-xsl">
							<view class="  margin-right-sm flex justify-center"
								style="width: 100%;height:65px;background-image:url(../../static/image/gclock.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
							</view>
						</view>
						<view style="flex-basis: 70%;" class="padding-sm radius  text-center justify-center">
							<view class="text-black text-bold">
								{{item.name}}
							</view>
							<view class="flex margin-top-sm">
								<view class="flex-sub text-gray">
									{{item.status?'已连接':'已断开'}}
								</view>
								<view class="flex-sub" v-if="!item.status && statusOnlyFlag">

									<text class="text-green"
										@tap.stop="dispatch('createBLEConnection', item)">重新连接</text>
								</view>
								<view class="flex-sub" v-if="item.status">
									<text class="text-green" @tap.stop="dispatch('disconnect', item)">断开</text>
								</view>
								<view class="flex-sub">
									<text class="text-green" @tap.stop="dispatch('delpaired', item)">移除设备</text>
								</view>
							</view>
							<view class="text-gray margin-top-sm flex" v-if="item.status">
								<view class="flex-sub"></view>
								<view class=" flex-sub justify-center" style="width: 100%;height:20px;background-image:url(../../static/image/elec.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
								</view>
								<view class="flex-sub text-left justify-center" style="margin-top: 3px;">{{electStr}}</view>
							</view>
						</view>
					</view>
				</view>

			</scroll-view>

			<view class="text-center">
				<text class="text-green" v-if="statusOnlyFlag" @tap.stop="openAdd">添加设备</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import Bluetooth from '@/common/bluetooth.js';
	let bluetooth = new Bluetooth();
	export default {
		data() {
			return {
				electStr: '',
				statusOnlyFlag: true, //当前只有一个设备是处在链接状态 true 可连接
				timerStart: false, //是否开启计时器
				isOpenBle: this.$store.getters.getIsOpenBle, // 是否开启蓝牙
				paired: this.$store.getters.getPaired, // 已配对设备列表
				bledd: this.$store.getters.getBledd, // 是否启用蓝牙搜索
				devicesList: this.$store.getters.getDevicesList, // 可用设备列表
				manufacturer: this.$store.getters.getManufacturer // 厂商设备
			};
		},
		components: {

		},
		onShow() {
			_this = this
			setTimeout(() => {
				this.execTimer()
			}, 500)
		},
		onHide() {
			this.cancleTimer()
		},
		onLoad() {
			let that = this

			/**
			 * 关闭手机蓝牙时候 关闭蓝牙适配器
			 * @param {Object} res
			 */
			uni.onBluetoothAdapterStateChange(function(res) {
				if (!res.available) {
					console.info("onBluetoothAdapterStateChange")
					that.$store.dispatch('closeBluetoothAdapter')
				}
			})
			uni.onBLEConnectionStateChange(function(res) {
				// 该方法回调中可以用于处理连接意外断开等异常情况
				if (!res.connected) {

					console.info("24324324324")
					if (that.$store.getters.getPaired.length > 0) {
						var paired2 = that.$store.getters.getPaired;
						// console
						var index = paired2.findIndex(item => {
							return item.deviceId == res.deviceId;
						});
						var bitparied= paired[index]
						if (paired2[index].status) {
							console.info("onBLEConnectionStateChange")
							that.dispatch('disconnectAuto', paired2[index])
							
							bitparied.status = false
							that.$set(that.paired,index,bitparied)
						}
					}
				}
			})
		},
		props: {

		},
		watch: {
			'$store.state.bluetooth.paired': {
				handler(e) {
					console.info(99999)
					this.statusOnlyFlag = true
					this.paired = e;
					let that = this

					if (e != null && e.length > 0) {
						for (var i = 0; i < e.length; i++) {
							if (e[i].status) {
								this.statusOnlyFlag = false //不能做其他设备的搜索和链接
							}
						}
					}
				},
				immediate: true,
				deep: true
			},
			'$store.state.bluetooth.isOpenBle': {
				handler(e) {
					console.info(7777777)
					this.isOpenBle = e;
				},
				immediate: true,
				deep: true
			}
			// 	'$store.state.bluetooth': {
			// 		handler(e) {
			// 			console.info(33333333333)
			// 			this.statusOnlyFlag = true
			// 			this.isOpenBle = e.isOpenBle;
			// 			this.paired = e.paired;
			// 			this.bledd = e.bledd;
			// 			this.devicesList = e.devicesList;
			// 			let that = this

			// 			if (e.paired != null && e.paired.length > 0) {
			// 				for (var i = 0; i < e.paired.length; i++) {
			// 					if (e.paired[i].status) {
			// 						this.statusOnlyFlag = false //不能做其他设备的搜索和链接
			// 					}
			// 				}
			// 			}
			// 		},
			// 		immediate: true,
			// 		deep: true
			// 	}
		},
		methods: {

			// 打开蓝牙
			openBle(e) {
				!this.isOpenBle ? this.dispatch('openBluetoothAdapter') : this.dispatch('closeBluetoothAdapter');
			},
			// 使用store的函数
			dispatch(name, item) {
				console.info(item)
				this.$store.dispatch(name, item);
				let that = this
				if (name == 'disconnect') {
					console.info(that.paired)
					var index = that.paired.findIndex(res => {
						return res.deviceId == item.deviceId;
					});
					var bitparied = that.paired[index]
					
					if(bitparied.status){
					   bitparied.status = false
					   }
					
					that.$set(that.paired,index,bitparied)
					
				}
				if (name == 'createBLEConnection') {
					console.info(that.paired)
					var index = that.paired.findIndex(res => {
						return res.deviceId == item.deviceId;
					});
					var bitparied = that.paired[index]
					if(!bitparied.status){
					   bitparied.status = true
					   }
					   that.$set(that.paired,index,bitparied)
					
				}
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

			execTimer() {
				console.info(9999)
				_this.timerStart = true;
				_this.timer = setTimeout(_this.refresh(), 2000); //一分钟一次 循环获取
			},
			cancleTimer() {
				console.info('cancel')
				_this.timerStart = false;
				if (_this.timer) {
					clearTimeout(_this.timer);
				}
			},
			refresh() {
				if (_this.timerStart) {
					for (var s = 0; s < _this.paired.length; s++) {
						if (_this.paired[s].status) {
							_this.getElectic(_this.paired[s]);
							break;
						}
					}
					_this.timer = setTimeout(_this.refresh, 10000);
				}
				return _this.refresh;
			},
			getElectic(item) {
				console.info(item)
				let that = this

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
							var el = str.substr(8, 2)
							that.electStr = parseInt(el, 16) + '%';
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
