<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">检测</block>
		</cu-custom>
		<view class="cu-bar bg-white  margin-top">
			<view class=" text-xxl padding-top">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">添加数据</text>
				<text class="text-xs">(请添加血糖数据及出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar flex padding-top">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub text-xsl">
					<text class="cuIcon-shuidi  text-grey"></text>
				</view>

				<view class="flex-sub text-xsl ">
					<text class="cuIcon-sunfilling  text-grey"></text>
				</view>
				<view class="flex-sub text-xsl">
					<text class="cuIcon-roundadd  text-grey"></text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white  margin-top">
			<view class=" text-xxl padding-top">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">今日血糖</text>
				<text class="text-xs">(正常值：74-106mg/dL)</text>
			</view>
		</view>
		<view class="cu-bar bg-cuorange  flex padding-top">
			<view class="flex-sub flex">
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">80</text>
					</view>
					<view>
						<text class="text-white text-sm">第一次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">85</text>
					</view>
					<view>
						<text class="text-white text-sm">第二次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">90</text>
					</view>
					<view>
						<text class="text-white text-sm">第三次数据</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-xs margin-left">注意：每次血糖检测需要间隔2小时以上</text>
		</view>
		<view class="cu-bar bg-white  margin-top">
			<view class=" text-xxl padding-top">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">今日汗糖</text>
				<text class="text-xs">(正常值：74-106mg/dL)</text>
			</view>
		</view>
		<view class="cu-bar bg-cyan  flex padding-top">
			<view class="flex-sub flex">
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">85</text>
					</view>
					<view>
						<text class="text-white text-sm">第一次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">85</text>
					</view>
					<view>
						<text class="text-white text-sm">第二次数据</text>
					</view>
				</view>
				<view class="flex-sub text-center">
					<view>
						<text class="text-black  text-sl">90</text>
					</view>
					<view>
						<text class="text-white text-sm">第三次数据</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-xs margin-left">注意：每次血糖检测需要间隔2小时以上</text>
		</view>
		<view class="cu-bar bg-white">
			<view class=" text-xxl padding-top">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">汗糖/血糖数据对比</text>
			</view>
		</view>
		<view class="cu-bar bg-white flex">
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
				<qiun-data-charts type="line" :chartData="chartData" :echartsH5="true" :echartsApp="true" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {
					categories: ["1-1次", "1-2次", "1-3次"],
					series: [{
						name: "汗糖值",
						data: [80, 87, 92]
					}, {
						name: "血糖值",
						data: [76, 79, 73]
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
		components: {

		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if (e.currentTarget.dataset.id == 0) {
					this.chartData = this.chartDataDay
				}
				if (e.currentTarget.dataset.id == 1) {
					this.chartData = this.chartDataWeek
				}
				if (e.currentTarget.dataset.id == 2) {
					this.chartData = this.chartDataMonth
				}
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
</style>
