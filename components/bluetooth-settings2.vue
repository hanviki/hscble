<template>
	<view>
		<!-- D 设备设置窗口 -->
		<view class="cu-modal" :class="setting ? 'show' : ''" @tap="hide()">
			<view class="cu-dialog" style="background-color: transparent;top: 5%;" @tap.stop="hide()">
				<!-- title -->
				<view class="cu-bar margin bg-white shadow justify-end solid-bottom r" @tap.stop="">
					<view class="content">设备配置</view>
				</view>
				<!-- title -->
				<!-- 设备信息 -->
				<view class="text-left margin padding bg-white shadow r" @tap.stop=""
					v-if="paired.length > 0 && (index || index == 0)">
					<view class="padding-xs solid-bottom flex">
						<view class="flex-sub">设备名称：</view>
						<view class="flex-sub text-left">{{ paired[index].name }}</view>
						<view class="flex-sub text-right"><button @tap="delpaired"
								class="cu-btn cuIcon bg-red cuIcon-deletefill" /></view>
					</view>
					<view class="padding-xs solid-bottom flex">
						<view class="flex-sub">状态：</view>
						<view class="flex-sub flex">
							<text class="cu-tag round"
								:class="paired[index].status ? 'bg-green' : 'bg-red'">{{ paired[index].status ? '已连接' : '未连接' }}</text>
						</view>
						<view class="flex-sub text-right">
							<button class="cu-btn bg-orange cuIcon cuIcon-infofill"
								@tap="disconnect(paired[index])" v-if="paired[index].status" />
							<button class="cu-btn cuIcon bg-green cuIcon-roundaddfill"
								@tap="$store.dispatch('createBLEConnection', paired[index])" v-else />
						</view>
					</view>
					<view class="padding-xs solid-bottom flex">
						<view class="flex-sub">信号强度：</view>
						<view class="flex-sub text-left">
							<text v-if="paired[index].status">{{ paired[index].RSSI }}dBm
								({{ Math.max(100 + paired[index].RSSI, 0) }}%)</text>
							<text class="cu-tag round bg-red" v-else>未连接</text>
						</view>
						<view class="flex-sub text-right"></view>
					</view>
					<view class="padding-xs flex">
						<view class="flex-sub">设备ID：</view>
						<view class="flex-sub text-left">{{ paired[index].deviceId }}</view>
					</view>
				</view>
				<!-- 设备信息 -->
				<!-- 服务特征 -->
				<view class="margin bg-white shadow r" @tap.stop="" v-if="paired.length > 0 && (index || index == 0) && paired[index].status">
					<view class="padding solid-bottom">设备服务特征</view>
					<scroll-view scroll-y="true r" style="max-height: 40vh;" show-scrollbar="true">
						<view class="padding solid-bottom flex" v-for="(item, i) in manufacturer" :key="i" @tap.stop="">
							<view class="flex-sub text-left align-center">
								<text class="text-green cuIcon-roundcheckfill text-lg" />
							</view>
							<view class="flex-sub">
								<view>{{item.name}}</view>
								<view>{{item.manufacturer_name}}</view>
								<view class="flex">
									<view class="flex-sub" v-if="item.properties.read"
										@tap.stop="readManufacturer(paired[index], item)">
										<text class="cu-tag round bg-green">R</text>
									</view>
									<view class="flex-sub" v-if="item.properties.write"
										@tap.stop="showModal(item)"> <text
											class="cu-tag round bg-green">W</text> </view>
									<view class="flex-sub" v-if="item.properties.notify"
										@tap.stop="notifyHandle(paired[index], item)">
										<text class="cu-tag round" :class="item.notify?'bg-green':'bg-gray'">
											{{item.notify?'N->开':'N->关'}}
										</text>
									</view>
								</view>
								<view >{{item.value}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入AT命令或字符</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input v-model="numberValue" placeholder="输入属性值" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left"
							@tap="writeManufacturer(paired[index])">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Bluetooth from '@/common/bluetooth.js';
	let bluetooth = new Bluetooth();
	export default {
		data() {
			return {
				eqpServices: [], // 设备所有服务特征
				paired: this.$store.getters.getPaired,
				manufacturer: this.getManufacturer(),
				modalName: null,
				numberValue: '',
				writeItem: {} //特征项
			};
		},
		onLoad() {
			console.info("这里无效呢")
		},
		props: {
			setting: {
				type: Boolean
			},
			index: {
				type: Number
			}
		},
		computed: {
			tp() {
				return val => {
					var t = true,
						ms = this.manufacturer;
					if (ms.length > 0) {
						for (var i = 0; i < ms.length; i++) {
							if (ms[i].serviceId === val.serviceId && ms[i].characteristicId === val.characteristicId) {
								t = false;
								break;
							}
						}
					} else {
						t = false;
					}
					return t;
				};
			}
		},
		filters: {

		},
		watch: {
			'$store.state.bluetooth.paired': {
				handler(e) {
					this.paired = e;
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			getManufacturer() {
				let manu= this.$store.getters.getManufacturer
				
				manu.forEach(function(element) {
				  element.notify =false
				  element.value =''
				});
				return manu
			},
			delpaired() {
				this.$store.dispatch('delpaired', this.paired[this.index])
				this.manufacturer.forEach(function(element) {
				  element.notify =false
				  element.value =''
				});
			},
			disconnect(item) {
				this.$store.dispatch('disconnect', item)
				this.manufacturer.forEach(function(element) {
				  element.notify =false
				  element.value =''
				});
				
				
			},
			// 修改配置
			async readManufacturer(item, manufacturer) {
				await this.$store.dispatch('readManufacturer', {
					item,
					manufacturer
				}).then(res => {
					console.info("读取数据")
					console.info(res)
					console.info("readManufacturer")
					uni.showToast({
						title: res.errMsg,
						icon: 'none',
						position: 'bottom'
					});
				});
			},
			async writeManufacturer(item) { // 发送命令或字符串給蓝牙  如果有notify功能，则打开
			let that= this
				let manufacturer = that.writeItem
				if (manufacturer.properties.notify) {
					console.info("notify:true")
					await that.openNotify(item, manufacturer) //每次发送时 
				}
				setTimeout(()=>{
					 that.$store.dispatch('writeManufacturer', {
						item,
						manufacturer,
						writeCode: that.numberValue
					}).then(res => {
						uni.showToast({
							title: res.errMsg,
							icon: 'none',
							position: 'bottom'
						});
					});
				},300)
				
				that.modalName =null
			},
		   notifyHandle(item, manufacturer2) {
				console.info(manufacturer2.notify)
				if (manufacturer2.notify) {
					this.closeNotify(item, manufacturer2)
					
				} else {
					this.openNotify(item, manufacturer2)
				}
			},
			 openNotify(item, manufacturer2) { //打开通知
			  manufacturer2.notify= true
			//  console.info(item.deviceId)
			 bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer2.serviceId, manufacturer2.characteristicId)
					.then(res => {
						console.info(manufacturer2.characteristicId)
						uni.onBLECharacteristicValueChange(function(res) {
														console.info("ffffffffff")
														let str = bluetooth.ab2Weight(res.value)
														manufacturer2.value = str.substr(0,str.length-3)
													})	
					});
                  
			},
			 closeNotify(item, manufacturer2) {
				 manufacturer2.notify= false
				uni.notifyBLECharacteristicValueChange({
					state: false, // 启用 notify 功能
					deviceId: item.deviceId,
					serviceId: manufacturer2.serviceId,
					characteristicId: manufacturer2.characteristicId,
					success: async res => {
						
						console.info(res)
					},
					fail(err) {
						console.info(err)
					}
				});
			},
			// setManufacturValue (deviceId,serviceId,characteristicId,value){
			// 	manufacturer.filter(p=>p.serviceId==serviceId && p.characteristicId==characteristicId).forEach(function (item) {
			//                  item.value =value
			//              })
			// }
			handleChangeValue(res) {
				let str = bluetooth.bufferString(res.value)
				console.info("str:" + str)
			},
			// 设置配置
			hide(index = null) {
				this.$emit('hide');
			},
			showModal(item) {
				this.numberValue= ''
				this.writeItem = item
				this.modalName = "DialogModal1"
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	};
</script>

<style>
	.r {
		border-radius: 20rpx;
	}
</style>
