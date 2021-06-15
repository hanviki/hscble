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
							<view class="flex-sub" v-if="!item.status && statusOnlyFlag">
							
								 <text class="text-green" @tap.stop="dispatch('createBLEConnection', item)">重新连接</text>
							</view>
							<view class="flex-sub" v-if="item.status">
								<text class="text-green" @tap.stop="dispatch('disconnect', item)">断开</text>
							</view>
							<view class="flex-sub">
								<text class="text-green" @tap.stop="dispatch('delpaired', item)">移除设备</text>
							</view>
						</view>
					   <view class="text-gray margin-top-sm" v-if="item.status">
							电量:{{electStr}}
						</view>
					</view>
				</view>
			</view>

		</scroll-view>

		<view class="text-center">
			<text class="text-green" v-if="statusOnlyFlag" @tap.stop="openAdd">添加设备</text>
		</view>
	</view>
</template>

<script>
	var _this;
	import Bluetooth from '@/common/bluetooth.js';
	let bluetooth = new Bluetooth();
	export default {
		name: 'bluetooth',
		data() {
			return {
				electStr: '',
				statusOnlyFlag: true, //当前只有一个设备是处在链接状态 true 可连接
				timerStart : false,//是否开启计时器
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
		mounted() {
			console.info(5555)
			_this = this;
			uni.$on('timerEmit',function (){
				console.info('execTimer')
				_this.execTimer()
			})
			//_this.execTimer()
			//_this.execTimer();
			uni.$on('timerCancel',function(){
				console.info('timecancel')
				_this.cancleTimer()
			});
		},
		created() {
			
			
		},
		onHide() {
			console.info("sub_hide")
		},
		watch: {
			'$store.state.bluetooth.paired': {
				handler(e) {
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
					this.isOpenBle = e;
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
			execTimer (){
				console.info(9999)
				_this.timerStart = true;
			    _this.timer= setTimeout(_this.refresh(), 10000); //一分钟一次 循环获取
			},
			cancleTimer () {
				console.info('cancel')
				_this.timerStart = false;
				if(_this.timer){
					clearTimeout(_this.timer);
				}
			},
			refresh () {
				if(_this.timerStart){
				for (var s = 0; s < _this.paired.length; s++) {
					if(_this.paired[s].status){
						_this.getElectic(_this.paired[s]);
						break;
					}
				}
				   _this.timer = setTimeout(_this.refresh,10000);
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
									that.electStr = parseInt(el, 16) +'%';
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
