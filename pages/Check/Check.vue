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
						<text class="text-black  text-sl">80</text>
					</view>
					<view >
						<text class="text-white text-sm">第一次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_2.Value}}</text>
					</view>
					<view >
						<text class="text-white text-sm">第二次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_3.Value}}</text>
					</view>
					<view >
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
			</view>
		</view>
		<view class="cu-bar bg-cyan  flex r">
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
		</view>
		<view class="cu-bar bg-white">
			<view class="charts-box ">
				<qiun-data-charts :type="chartType" :chartData="chartData" :echartsH5="true" :echartsApp="true" />
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					categories: ["1-1次", "1-2次", "1-3次"],
					series: [{
						name: "汗糖值",
						data: [60, 87, 92]
					}, {
						name: "血糖值",
						data: [86, 79, 73]
					}]
				},
				chartDataDay: {
					categories: ["1-1次", "1-2次", "1-3次"],
					series: [{
						name: "汗糖值",
						data: [60, 87, 92]
					}, {
						name: "血糖值",
						data: [86, 79, 73]
					}]
				},
				chartDataWeek: {
					categories: ["1-1次", "1-2次", "1-3次"],
					series: [{
						name: "汗糖值",
						data: [80, 87, 92]
					}, {
						name: "血糖值",
						data: [76, 79, 73]
					}]
				},
				chartDataMonth: {
					categories: ["1-1次", "1-2次", "1-3次"],
					series: [{
						name: "汗糖值",
						data: [80, 102, 92]
					}, {
						name: "血糖值",
						data: [76, 79, 50]
					}]
				},
				TabCur: 0,
			}
		},
		computed: {
			
		},
		onLoad() {
			this.fetch()
		},
		components: {

		},
		methods: {
			showAdd() {
				uni.navigateTo({
					url: '/pages/Check/CheckAdd'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if (e.currentTarget.dataset.id == 0) {
					this.chartType = "column"
					this.chartData = this.chartDataDay
				}
				if (e.currentTarget.dataset.id == 1) {
					this.chartType = "column"
					this.chartData = this.chartDataWeek
				}
				if (e.currentTarget.dataset.id == 2) {
					this.chartType = "line"
					this.chartData = this.chartDataMonth
				}

			},
			ceshi() {
				uni.reLaunch({
					url: '/pages/Check/CheckAdd'
				});
			},
			fetch() {
				var that = this
                 let userInfo=     that.$store.state.user.userInfo
				that.$api.check.reportCheck({
					userId: userInfo.Id
				}).then(res => {
					if (res.Code == "1") {
						let data = res.Data
						console.info(data)
						let SweetSugarData = data.DailyData.SweetSugarData
						if (SweetSugarData != null) {
							if (SweetSugarData.length > 0) {
								this.sweetSugar_1 = SweetSugarData[0]
								this.chartData.series[0].data[0] = SweetSugarData[0].Value
							}
							if (SweetSugarData.length > 1) {
								this.sweetSugar_2 = SweetSugarData[1]
								this.chartData.series[0].data[1] = SweetSugarData[1].Value
							}
							if (SweetSugarData.length > 2) {
								this.sweetSugar_3 = SweetSugarData[2]
								this.chartData.series[0].data[2] = SweetSugarData[2].Value
							}
						}
						let BloodSugarData = data.DailyData.BloodSugarData
						if (BloodSugarData != null) {
							if (BloodSugarData.length > 0) {
								this.bloodSugar_1 = BloodSugarData[0]
								this.chartData.series[1].data[0] = BloodSugarData[0].Value
							}
							if (BloodSugarData.length > 1) {
								this.bloodSugar_2 = BloodSugarData[1]
								this.chartData.series[1].data[1] = BloodSugarData[1].Value
							}
							if (BloodSugarData.length > 2) {
								this.bloodSugar_3 = BloodSugarData[2]
								this.chartData.series[1].data[2] = BloodSugarData[2].Value
							}
						}
						this.chartDataDay = this.chartData
						//this.checkCount = SweetSugarData.length

						let WeeklyData_SweetSugarData = data.WeeklyData.SweetSugarData
						if(WeeklyData_SweetSugarData!=null)
						{
							
						}
						// for (var i = 0; i < WeeklyData_SweetSugarData.length; i++) {
						// 	WeeklyData_SweetSugarData[i]
						// 	this.chartDataWeek.categories.push()
						// }

					} else {
						uni.showToast({
							icon: "none",
							title: "提交数据出错，请联系管理员",
						})
					}
				})
			}

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
	.cuh{
		min-height: 45px;
	}
</style>
