<template>
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">检测数据</block>
		</cu-custom>
		<view class="bg-white margin-top-sm">
			<view class=" text-lg">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">添加数据</text>
				<text class="text-sm">(请添加血糖数据及出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar flex bg-gray r" style="min-height: 61px;">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub text-sl">
					<text class="cuIcon-shuidi  " :class="checkCount==3?'text-green':'text-gray'"></text>
				</view>

				<view class="flex-sub text-sl ">
					<text class="cuIcon-sunfilling" :class="checkCount==3?'text-green':'text-gray'"></text>
				</view>
				<view class="flex-sub text-sl" @tap="showAdd">
					<text class="cuIcon-roundadd" :class="checkCount==3?'text-gray':'text-green'"></text>
				</view>
			</view>
		</view>
		<view class=" bg-white margin-top-sm">
			<view class=" text-lg">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">今日血糖</text>
				<text class="text-xs">(正常值：74-106mg/dL)</text>
			</view>
		</view>
		<view class="cu-bar bg-cuorange  flex  r">
			<view class="flex-sub flex">
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{bloodSugar_1.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第一次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{bloodSugar_2.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第二次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{bloodSugar_3.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第三次数据</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-sm margin-left">注意：每次血糖检测需要间隔2小时以上</text>
		</view>
		<view class=" bg-white margin-top-sm">
			<view class=" text-lg ">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">今日汗糖</text>
				<text class="text-sm">(正常值：74-106mg/dL)</text>
				<button class="cu-btn text-green" @tap="endGenerate">结束生成</button>
			</view>
		</view>
		<view class="cu-bar bg-cyan  flex r">
			<view class="flex-sub flex">
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_1.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第一次数据{{pakgeNum}}{{!isShow&&opIndex==1?'生成中...':''}}</text>
						<button class="cu-btn text-green" v-if="isShow" @tap="uploadData">第一次数据</button>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_2.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第二次数据{{pakgeNum}}{{!isShow&&opIndex==2?'生成中...':''}}</text>
						<button class="cu-btn text-green" v-if="isShow" @tap="uploadData2">第二次数据</button>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_3.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第三次数据{{pakgeNum}}{{!isShow&&opIndex==3?'生成中...':''}}</text>
						<button class="cu-btn text-green" v-if="isShow" @tap="uploadData3">第三次数据</button>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-sm margin-left">注意：汗糖检测与血糖检测间隔需在15分钟以内</text>
		</view>
		<view class=" bg-white margin-top-sm">
			<view class=" text-lg ">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">汗糖/血糖数据对比</text>
			</view>
		</view>
		<view class="bg-white flex">
			<view class="bg-white nav text-center flex-sub">
				<view class="cu-item" :class="0==TabCur?'text-blue cur':''" :data-id="0" @tap="tabSelect">
					日
				</view>
				<view class="cu-item" :class="1==TabCur?'text-blue cur':''" :data-id="1" @tap="tabSelect">
					周
				</view>
				<view class="cu-item" :class="2==TabCur?'text-blue cur':''" :data-id="2" @tap="tabSelect">
					月
				</view>
			</view>
		</view <view class="cu-bar bg-white">
		<view class="charts-box ">
			<qiun-data-charts type="column" v-if="TabCur==0" :chartData="chartDataDay" :echartsH5="true"
				:echartsApp="true" />
			<qiun-data-charts type="column" v-if="TabCur==1" :chartData="chartDataWeek" :echartsH5="true"
				:echartsApp="true" />
			<qiun-data-charts type="line" v-if="TabCur==2" :chartData="chartDataMonth" :echartsH5="true"
				:echartsApp="true" />
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
				paired: [],
				manufacturer: this.$store.getters.getManufacturer,
				isShow: true,
				isEnd: 1,
				pakgeNum: 0,
				onceStr: '', //81 包 ，存储每一包的数据
				opIndex: 0,
				dataUx: [], //存放返回的字符串
				cmdArr: [
					'0103000000320036', '0103003200320068', '010300640032009A', '01030096003200CC', '010300C8003200FE',
					'010300FA00320130', '0103012C00320063', '0103015E00320095', '01030190003200C7', '010301C2003200F9',
					'010301F40032012B', '010302260032005E', '0103025800320090', '0103028A003200C2', '010302BC003200F4',
					'010302EE00320126', '0103032000320059', '010303520032008B', '01030384003200BD', '010303B6003200EF',
					'010303E800320121', '0103041A00320054', '0103044C00320086', '0103047E003200B8', '010304B0003200EA',
					'010304E20032011C', '010305140032004F', '0103054600320081', '01030578003200B3', '010305AA003200E5',
					'010305DC00320117', '0103060E0032004A', '010306400032007C', '01030672003200AE', '010306A4003200E0',
					'010306D600320112', '0103070800320045', '0103073A00320077', '0103076C003200A9', '0103079E003200DB',
					'010307D00032010D', '0103080200320040', '0103083400320072', '01030866003200A4', '01030898003200D6',
					'010308CA00320108', '010308FC0032013A', '0103092E0032006D', '010309600032009F', '01030992003200D1',
					'010309C400320103', '010309F600320135', '01030A2800320068', '01030A5A0032009A', '01030A8C003200CC',
					'01030ABE003200FE', '01030AF000320130', '01030B2200320063', '01030B5400320095', '01030B86003200C7',
					'01030BB8003200F9', '01030BEA0032012B', '01030C1C0032005E', '01030C4E00320090', '01030C80003200C2',
					'01030CB2003200F4', '01030CE400320126', '01030D1600320059', '01030D480032008B', '01030D7A003200BD',
					'01030DAC003200EF', '01030DDE00320121', '01030E1000320054', '01030E4200320086', '01030E74003200B8',
					'01030EA6003200EA', '01030ED80032011C', '01030F0A0032004F', '01030F3C00320081', '01030F6E003200B3',
					'01030FA0000C00BF'
				],
				sweetSugar_1: {
					Value: ''
				},
				sweetSugar_2: {
					Value: ''
				},
				sweetSugar_3: {
					Value: ''
				},
				bloodSugar_1: {
					Value: ''
				},
				bloodSugar_2: {
					Value: ''
				},
				bloodSugar_3: {
					Value: ''
				},
				checkCount: 0,
				chartType: 'column',
				chartData: {
					categories: [],
					series: [{
						name: "汗糖值",
						data: []
					}, {
						name: "血糖值",
						data: []
					}]
				},
				chartDataDay: {
					categories: [],
					series: [{
						name: "汗糖值",
						data: []
					}, {
						name: "血糖值",
						data: []
					}]
				},
				chartDataWeek: {
					categories: [],
					series: [{
						name: "汗糖值",
						data: []
					}, {
						name: "血糖值",
						data: []
					}]
				},
				chartDataMonth: {
					categories: [],
					series: [{
						name: "汗糖值",
						data: []
					}, {
						name: "血糖值",
						data: []
					}]
				},
				TabCur: 0,
			}
		},
		computed: {

		},
		watch: {
			'$store.state.bluetooth.paired': {
				handler(e) {
					this.paired = e;
					if (e[0] && e[0].status) {

					}
				},
				immediate: true,
				deep: true
			},

			pakgeNum(newValue) {
				let that = this
				that.onceStr = ''
				if (newValue > 0) {
					if (newValue > 202) {
						//console.info('jieshu')
						//console.info(that.dataUx.toString())
						if (newValue == 203) {
							that.isEnd = 1
							that.loadDataToserver()
							// setTimeout(() => {
							// 	//清空
							// 	that.$store.dispatch('writeManufacturer', {
							// 		item: that.paired[0],
							// 		manufacturer: that.manufacturer[1],
							// 		writeCode: '0110100400010204D200FE',
							// 		index: 0
							// 	}).then(res => {
							// 		uni.showToast({
							// 			title: res.errMsg,
							// 			icon: 'none',
							// 			position: 'bottom'
							// 		});
							// 	});
							// }, 500)
							setTimeout(() => {
								//使能
								that.$store.dispatch('writeManufacturer', {
									item: that.paired[0],
									manufacturer: that.manufacturer[1],
									writeCode: '01100FD2000102000000F5',
									index: 0
								}).then(res => {
									uni.showToast({
										title: res.errMsg,
										icon: 'none',
										position: 'bottom'
									});
								});
							}, 800)

						}
					} else {

						setTimeout(() => {
							that.readManufacturerReadData(that.calcCommand(newValue - 1,20))
						}, 100)
					}
				}
			}
		},
		onLoad() {
			this.fetch()
			uni.$on("handleFun", () => {
				this.fetch()
				// 清除监听
				// uni.$off('handleFun');
			})
		},
		components: {

		},
		methods: {
			calcCommand(Pack_ID, Length) {
				var Command = [];
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command.push('0');
				Command[0] = 1;
				Command[1] = 3;
				var sum = 0;
				var Start_Address = Pack_ID * Length;
				Command[2] = Start_Address >> 8;
				Command[3] = Start_Address & 0xFF;
				Command[4] = Length >> 8;
				Command[5] = Length & 0xFF;
				for (var j = 0; j < 6; j++) {
					sum += Command[j];
				}
				Command[6] = sum >> 8;
				Command[7] = sum & 0xFF;
				//生成完毕，在此执行发送指令
				var str_cmd = ""
				for (var i = 0; i < 8; i++) {
					console.info(Command[i])
					str_cmd += this.pad(parseInt(Command[i]).toString(16), 2)
				}
				console.info(str_cmd)
				return str_cmd
			},
			pad(num, n) {
				var tbl = [];
				var len = n - num.toString().length;
				if (len <= 0) return num;
				if (!tbl[len]) tbl[len] = (new Array(len + 1)).join('0');
				return tbl[len] + num;
			},
			showAdd() {
				uni.navigateTo({
					url: '/pages/Check/CheckAdd'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;

			},
			ceshi() {
				uni.reLaunch({
					url: '/pages/Check/CheckAdd'
				});
			},
			endGenerate() {
				this.calcCommand(0,20);
				this.isEnd = 1
				this.pakgeNum = 0
				this.isShow = true
			},
			loadDataToserver() {
				let that = this
				let userInfo = that.$store.getters['user/getUserInfo']
				let strU = that.dataUx.join(",")
				that.$api.check.addsweatsugarpkg({
					user_id: userInfo.Id,
					pkg: strU.replace(/,/g, '')
				}).then(res => {
					console.info(res)
					this.isShow = true
					if (res.Code == "1") {
						if (that.opIndex == 1) {
							that.sweetSugar_1.Value = parseInt(parseFloat(res.CalVal))
						}
						if (that.opIndex == 2) {
							that.sweetSugar_2.Value = parseInt(parseFloat(res.CalVal))
						}
						if (that.opIndex == 3) {
							that.sweetSugar_3.Value = parseInt(parseFloat(res.CalVal))
						}
					}
				})
			},
			fetch() {
				console.info("fetch")
				var that = this
				let userInfo = that.$store.getters['user/getUserInfo']
				that.$api.check.reportCheck({
					userId: userInfo.Id
				}).then(res => {
					if (res.Code == "1") {
						let data = res.Data
						console.info(data)
						let SweetSugarData = data.DailyData
						let monthlyData = data.MonthlyData
						let weeklyData = data.WeeklyData
						let threeData = data.Top3DailyData
						if (threeData != null) {
							for (let i = 0; i < threeData.length; i++) {

								if (i == 0) {
									this.sweetSugar_1.Value = threeData[i].SweetSugarData
									this.bloodSugar_1.Value = threeData[i].BloodSugarData
								}
								if (i == 1) {
									this.sweetSugar_2.Value = threeData[i].SweetSugarData
									this.bloodSugar_2.Value = threeData[i].BloodSugarData
								}
								if (i == 2) {
									this.sweetSugar_3.Value = threeData[i].SweetSugarData
									this.bloodSugar_3.Value = threeData[i].BloodSugarData
								}


							}
						}

						if (SweetSugarData != null) {
							for (let i = 0; i < SweetSugarData.length; i++) {
								that.$set(that.chartDataDay.categories, i, SweetSugarData[i].Point)

								that.$set(that.chartDataDay.series[0].data, i, SweetSugarData[i].SweetSugarData)
								that.$set(that.chartDataDay.series[1].data, i, SweetSugarData[i].BloodSugarData)
							}
						}
						if (monthlyData != null) {
							for (let i = 0; i < monthlyData.length; i++) {
								that.$set(that.chartDataMonth.categories, i, monthlyData[i].Point)

								that.$set(that.chartDataMonth.series[0].data, i, monthlyData[i].SweetSugarData)
								that.$set(that.chartDataMonth.series[1].data, i, monthlyData[i].BloodSugarData)
							}
						}
						if (weeklyData != null) {
							for (let i = 0; i < weeklyData.length; i++) {
								that.$set(that.chartDataWeek.categories, i, weeklyData[i].Point)

								that.$set(that.chartDataWeek.series[0].data, i, weeklyData[i].SweetSugarData)
								that.$set(that.chartDataWeek.series[1].data, i, weeklyData[i].BloodSugarData)
							}
						}
						//that.chartDataDay = that.chartData
						//this.checkCount = SweetSugarData.length


					} else {
						uni.showToast({
							icon: "none",
							title: "提交数据出错，请联系管理员",
						})
					}
				})
			},
			async uploadData() {
				let that = this

				if (that.paired.length > 0 && that.paired[0].status) {
					that.isShow = false
					that.opIndex = 1
					//console.info('88888')

					that.pakgeNum = 0
					that.dataUx = []
					let manufacturer = that.manufacturer
					let item = that.paired[0]
					await bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer[0].serviceId,
							manufacturer[0].characteristicId)
						.then(res => {
							//console.info(manufacturer[0].characteristicId)
							uni.onBLECharacteristicValueChange(function(res) {
								//console.info(3222)

								let str = bluetooth.ab2hex(res.value)
								//	console.info(str)
								// 数组组数
								// let str_h ='0x'+ bluetooth.ab2hex(res.value).substr(6,2)	
								// let str_l = '0x' + bluetooth.ab2hex(res.value).substr(8,2)
								// console.info(str_h)
								// let str2= parseInt(str_h,16)*256 + parseInt(str_l,16)

								if (str.indexOf('01101004') == 0 && that.isEnd == 0) {
									that.pakgeNum = 1
									that.dataUx = []
								} else {
									if (that.isEnd == 0) {
										that.onceStr += str
									}
									if (that.pakgeNum == 202) {
										setTimeout(() => {

											let le = parseInt(that.onceStr.length)
											that.dataUx.push(that.onceStr.substr(6, le - 10))
											if (that.isEnd == 0) {
												that.pakgeNum += 1
											}
										}, 500)
									} else {
										if (str.indexOf('010328') == 0) {
											setTimeout(() => {
												console.info(that.onceStr)
												let le = parseInt(that.onceStr.length)
												that.dataUx.push(that.onceStr.substr(6, le - 10))
												if (that.isEnd == 0) {
													that.pakgeNum += 1
												}
											}, 500)


										}
									}

									// else {
									// 	console.info(str)
									// 	console.info(that.onceStr)
									// 	that.onceStr += str
									// 	let calcStr= that.onceStr
									// 	let str2= calcStr.substr(6, 100)
									// 	if(str2.length==100) {
									// 	  that.dataUx[that.pakgeNum-1].push(str2)
									// 	  that.pakgeNum += 1
									// 	  that.onceStr =''
									// 	}
									// }
								}

							})
						});
					setTimeout(() => {
						//使能 失能
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '01100FD2000102000100F6',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 500)

					setTimeout(() => {
						that.isEnd = 0
						//装在数据
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '0110100400020400030001002F',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 2100)

				} else {
					uni.showToast({
						title: '蓝牙连接已断开，请重新连接',
						icon: 'none',
						position: 'bottom'
					});
				}
			},
			async uploadData2() {

				//console.info('88888')
				let that = this

				if (that.paired.length > 0 && that.paired[0].status) {

					that.isShow = false
					that.opIndex = 2
					that.pakgeNum = 0
					that.dataUx = []
					let manufacturer = that.manufacturer
					let item = that.paired[0]
					await bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer[0].serviceId,
							manufacturer[0].characteristicId)
						.then(res => {
							//console.info(manufacturer[0].characteristicId)
							uni.onBLECharacteristicValueChange(function(res) {
								//console.info(3222)

								let str = bluetooth.ab2hex(res.value)
								//	console.info(str)
								// 数组组数
								// let str_h ='0x'+ bluetooth.ab2hex(res.value).substr(6,2)	
								// let str_l = '0x' + bluetooth.ab2hex(res.value).substr(8,2)
								// console.info(str_h)
								// let str2= parseInt(str_h,16)*256 + parseInt(str_l,16)

								if (str.indexOf('01101004') == 0 && that.isEnd == 0) {
									that.pakgeNum = 1
									that.dataUx = []
								} else {
									if (that.isEnd == 0) {
										that.onceStr += str
									}
									if (that.pakgeNum == 202) {
										setTimeout(() => {
											console.info(that.onceStr)
											let le = parseInt(that.onceStr.length)
											that.dataUx.push(that.onceStr.substr(6, le - 10))
											if (that.isEnd == 0) {
												that.pakgeNum += 1
											}
										}, 500)
									} else {
										if (str.indexOf('010328') == 0) {
											setTimeout(() => {
												let le = parseInt(that.onceStr.length)
												that.dataUx.push(that.onceStr.substr(6, le - 10))
												if (that.isEnd == 0) {
													that.pakgeNum += 1
												}
											}, 500)


										}
									}

									// else {
									// 	console.info(str)
									// 	console.info(that.onceStr)
									// 	that.onceStr += str
									// 	let calcStr= that.onceStr
									// 	let str2= calcStr.substr(6, 100)
									// 	if(str2.length==100) {
									// 	  that.dataUx[that.pakgeNum-1].push(str2)
									// 	  that.pakgeNum += 1
									// 	  that.onceStr =''
									// 	}
									// }
								}

							})
						});
					setTimeout(() => {
						//使能 失能
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '01100FD2000102000100F6',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 500)
					setTimeout(() => {
						//装在数据
						that.isEnd = 0
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '01101004000204000300020030',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 2100)
				} else {
					uni.showToast({
						title: '蓝牙连接已断开，请重新连接',
						icon: 'none',
						position: 'bottom'
					});
				}


			},
			async uploadData3() {
				let that = this

				if (that.paired.length > 0 && that.paired[0].status) {
					that.isShow = false
					that.opIndex = 3
					//console.info('88888')

					that.pakgeNum = 0
					that.dataUx = []
					let manufacturer = that.manufacturer
					let item = that.paired[0]
					await bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer[0].serviceId,
							manufacturer[0].characteristicId)
						.then(res => {
							//console.info(manufacturer[0].characteristicId)
							uni.onBLECharacteristicValueChange(function(res) {
								//console.info(3222)

								let str = bluetooth.ab2hex(res.value)
								//	console.info(str)
								// 数组组数
								// let str_h ='0x'+ bluetooth.ab2hex(res.value).substr(6,2)	
								// let str_l = '0x' + bluetooth.ab2hex(res.value).substr(8,2)
								// console.info(str_h)
								// let str2= parseInt(str_h,16)*256 + parseInt(str_l,16)

								if (str.indexOf('01101004') == 0 && that.isEnd == 0) {
									that.pakgeNum = 1
									that.dataUx = []
								} else {
									if (that.isEnd == 0) {
										that.onceStr += str
									}
									if (that.pakgeNum == 202) {
										setTimeout(() => {
											console.info(that.onceStr)
											let le = parseInt(that.onceStr.length)
											that.dataUx.push(that.onceStr.substr(6, le - 10))
											if (that.isEnd == 0) {
												that.pakgeNum += 1
											}
										}, 500)
									} else {
										if (str.indexOf('010328') == 0) {
											setTimeout(() => {
												console.info(that.onceStr)
												let le = parseInt(that.onceStr.length)
												that.dataUx.push(that.onceStr.substr(6, le - 10))
												if (that.isEnd == 0) {
													that.pakgeNum += 1
												}
											}, 500)


										}
									}

									// else {
									// 	console.info(str)
									// 	console.info(that.onceStr)
									// 	that.onceStr += str
									// 	let calcStr= that.onceStr
									// 	let str2= calcStr.substr(6, 100)
									// 	if(str2.length==100) {
									// 	  that.dataUx[that.pakgeNum-1].push(str2)
									// 	  that.pakgeNum += 1
									// 	  that.onceStr =''
									// 	}
									// }
								}

							})
						});
					setTimeout(() => {
						//使能 失能
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '01100FD2000102000100F6',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 500)
					setTimeout(() => {
						that.isEnd = 0
						//装在数据
						that.$store.dispatch('writeManufacturer', {
							item: that.paired[0],
							manufacturer: manufacturer[1],
							writeCode: '01101004000204000300030031',
							index: 0
						}).then(res => {
							uni.showToast({
								title: res.errMsg,
								icon: 'none',
								position: 'bottom'
							});
						});
					}, 2100)

				} else {
					uni.showToast({
						title: '蓝牙连接已断开，请重新连接',
						icon: 'none',
						position: 'bottom'
					});
				}
			},

			readManufacturerReadData(num16) { // 读取包数 当前包数+1
				let that = this
				let item = that.paired[0]
				let manufacturer = that.manufacturer
				// bluetooth.notifyBLECharacteristicValueChange(item.deviceId, manufacturer[0].serviceId, manufacturer[0]
				// 		.characteristicId)
				// 	.then(res => {
				// 		uni.onBLECharacteristicValueChange(function(res) {
				// 			//	console.info('000000000')

				// 			let str = bluetooth.ab2hex(res.value)
				// 			//  console.info(str)
				// 			if (str.indexOf('010364') == 0) {
				// 				console.info(str)
				// 				that.dataUx.push(str.sub(5, 50 * 2))
				// 				that.pakgeNum += 1
				// 			}

				// 		})
				// 	});
				setTimeout(() => {
					that.$store.dispatch('writeManufacturer', {
						item,
						manufacturer: manufacturer[1],
						writeCode: num16,
						index: 0
					}).then(res => {
						uni.showToast({
							title: res.errMsg,
							icon: 'none',
							position: 'bottom'
						});
					});
				}, (that.pakgeNum == 1) ? 2000 : 150)

				//	},300)

				//that.modalName = null
			},


		}
	}
</script>

<style>
	.bg-cuorange {
		background-color: #FFA54F;
	}

	.charts-box {
		width: 100%;
		height: 400rpx;
	}

	.r {
		border-radius: 10rpx;
		width: 96%;
		margin-left: 2%;
		padding-bottom: 10rpx;
	}

	.cuh {
		min-height: 45px;
	}
</style>
