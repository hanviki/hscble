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
						<text class="text-black  text-sl">{{sweetSugar_1.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第一次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_2.Value}}</text>
					</view>
					<view>
						<text class="text-white text-sm">第二次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view class="cuh">
						<text class="text-black  text-sl">{{sweetSugar_3.Value}}</text>
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
				<qiun-data-charts type="column" v-if="TabCur==0" :chartData="chartDataDay" :echartsH5="true" :echartsApp="true" />
				<qiun-data-charts type="column" v-if="TabCur==1" :chartData="chartDataWeek" :echartsH5="true" :echartsApp="true" />
				<qiun-data-charts type="line" v-if="TabCur==2" :chartData="chartDataMonth" :echartsH5="true" :echartsApp="true" />
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
						let SweetSugarData = data.DailyData.SweetSugarData
						if (SweetSugarData != null) {
							if (SweetSugarData.length > 0) {
								that.sweetSugar_1 = SweetSugarData[0]
								that.$set(that.chartDataDay.categories,0,'1-1次')
								that.$set(that.chartDataDay.series[0].data,0 , SweetSugarData[0].Value)
							}
							if (SweetSugarData.length > 1) {
								that.sweetSugar_2 = SweetSugarData[1]
								that.$set(that.chartDataDay.categories,1,'1-2次')
								that.$set(that.chartDataDay.series[0].data,1 , SweetSugarData[1].Value)
							}
							if (SweetSugarData.length > 2) {
								that.sweetSugar_3 = SweetSugarData[2]
								that.$set(that.chartDataDay.categories,2,'1-3次')
								that.$set(that.chartDataDay.series[0].data,2 , SweetSugarData[2].Value)
							}
						}
						let BloodSugarData = data.DailyData.BloodSugarData
						if (BloodSugarData != null) {
							if (BloodSugarData.length > 0) {
								that.bloodSugar_1 = BloodSugarData[0]
								that.$set(that.chartDataDay.series[1].data,0 , BloodSugarData[0].Value)
							}
					if (BloodSugarData.length > 1) {
								that.bloodSugar_2 = BloodSugarData[1]
								that.$set(that.chartDataDay.series[1].data,1, BloodSugarData[1].Value)
							}
							if (BloodSugarData.length > 2) {
								that.bloodSugar_3 = BloodSugarData[2]
								that.$set(that.chartDataDay.series[1].data,2 , BloodSugarData[2].Value)
							}
						}
						//that.chartDataDay = that.chartData
						//this.checkCount = SweetSugarData.length

						let WeeklyData_SweetSugarData = data.WeeklyData.SweetSugarData
						if (WeeklyData_SweetSugarData != null) {

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

	.cuh {
		min-height: 45px;
	}
</style>
