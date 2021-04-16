<template name="basics">
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加数据</block>
		</cu-custom>
		<view class="bg-white margin-top-sm">
			<view class=" text-lg ">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">血糖数据</text>
				<text class="text-sm">(请添加血糖数据及出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar bg-gray flex  r padding-sm">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-shangwu " :class="timeIndex==0?'text-green':'text-gray'"
							@tap="selectTimeIndex(0)" />
					</view>
					<view>
						<text class="text-sm">上午</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-xiawu " :class="timeIndex==1?'text-green':'text-gray'"
							@tap="selectTimeIndex(1)" />
					</view>
					<view>
						<text class="text-sm">下午</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-yueliang2 " :class="timeIndex==2?'text-green':'text-gray'"
							@tap="selectTimeIndex(2)" />
					</view>
					<view>
						<text class="text-sm">晚上</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray   r padding-sm">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-food2 " :class="foodIndex==0?'text-green':'text-gray'"
							@tap="selectFoodIndex(0)" />
					</view>
					<view>
						<text class="text-sm">餐前</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-kafei " :class="foodIndex==1?'text-green':'text-gray'"
							@tap="selectFoodIndex(1)" />
					</view>
					<view>
						<text class="text-sm">餐后</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-roundadd " :class="foodIndex==2?'text-green':'text-gray'"
							@tap="selectFoodIndex(2)" />
					</view>
					<view>
						<text class="text-sm">其他</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray  r padding-sm" style="min-height: 81px;">
			<view class="  flex-sub flex text-center" >
				<view class="flex-sub text-sl">
					<text class="cuIcon-shuidi text-green"></text>
				</view>
				<view class="flex-twice flex padding-top-sm" >
					<view class="flex-sub text-right " >
						<input type="number" class="text-xxl text-bold" v-model="measureNumber" placeholder="--" />
					</view>
					<view class="flex-sub text-left padding-left text-xxl text-gray">
						mg/dL
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-sm margin-left">注意：每次血糖检测需要间隔2小时以上</text>
		</view>
		<view class=" bg-white margin-top-sm">
			<view class=" text-lg">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-lg text-black text-bold">出汗情况</text>
				<text class="text-sm">(请添加出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar flex bg-gray   r padding-sm">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-sunfilling" :class="sportIndex==0?'text-green':'text-gray'"
							@tap="selectSportIndex(0)" />
					</view>
					<view>
						<text class="text-sm">高温</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-sport " :class="sportIndex==1?'text-green':'text-gray'"
							@tap="selectSportIndex(1)" />
					</view>
					<view>
						<text class="text-sm">运动</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-kafei " :class="sportIndex==2?'text-green':'text-gray'"
							@tap="selectSportIndex(2)" />
					</view>
					<view>
						<text class="text-sm">饮食</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-roundadd " :class="sportIndex==3?'text-green':'text-gray'"
							@tap="selectSportIndex(3)" />
					</view>
					<view>
						<text class="text-sm">其他</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray   r padding-sm">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-dian" :class="sweatIndex==0?'text-green':'text-gray'"
							@tap="selectSweatIndex(0)" />
					</view>
					<view>
						<text class="text-sm">少量汗</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-liangdian " :class="sweatIndex==1?'text-green':'text-gray'"
							@tap="selectSweatIndex(1)" />
					</view>
					<view>
						<text class="text-sm">较多汗</text>
					</view>
				</view>
				<view class="flex-sub ">
					<view class="text-sl ">
						<button class="cu-btn cuIcon-dian1  text-right" :class="sweatIndex==2?'text-green':'text-gray'"
							@tap="selectSweatIndex(2)" />
					</view>
					<view>
						<text class="text-sm">大量汗</text>
					</view>
				</view>
			</view>

		</view>
		<view class="bg-white ">
			<text class="text-sm margin-left">注意：汗糖检测与血糖检测间隔间隔需在需在15分钟以内</text>
		</view>
		
			<button class="cu-btn block bg-green  lg btm" @tap="submitCheck"> 提交数据 </button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeIndex: 0,
				foodIndex: 0,
				sportIndex: 0,
				sweatIndex: 0,
				measureNumber: ''
			}
		},
		methods: {
			selectTimeIndex(index) {
				this.timeIndex = index
			},
			selectFoodIndex(index) {
				this.foodIndex = index
			},
			selectSportIndex(index) {
				this.sportIndex = index
			},
			selectSweatIndex(index) {
				this.sweatIndex = index
			},
			submitCheck() {
				var that = this
				console.log("提交表单", this.loginForm)
				if (that.measureNumber == "") {
					uni.showToast({
						icon: "none",
						title: "请填写汗糖值",
					})
					return;
				}
				that.$api.check.addCheck({
					timeIndex: this.timeIndex,
					foodIndex: this.foodIndex,
					sportIndex: this.foodIndex,
					sweatIndex: this.sweatIndex,
					measureNumber: this.measureNumber
				}).then(res=>{
					if(res.data.code='1'){
					uni.reLaunch({
						url: '/pages/index/index'
					});
					}
					else {
						uni.showToast({
							icon: "none",
							title: "提交数据出错，请联系管理员",
						})
						return;
					}
				})
			}
		}
	}
</script>

<style>
	.r {
		border-radius: 10rpx;
		width: 96%;
		margin-left: 2%;
	}

	.padding0 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.btm {
		  position: fixed;
		      width: 96%;
		      bottom: 10rpx;
		      z-index: 1024;
			  margin-left: 2%;
	}
</style>
