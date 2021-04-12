<template name="basics">
	<view class="bg-white">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加数据</block>
		</cu-custom>
		<view class="cu-bar bg-white ">
			<view class=" text-xxl ">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">血糖数据</text>
				<text class="text-xs">(请添加血糖数据及出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar bg-gray flex padding-sm r">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-shangwu " :class="timeIndex==0?'text-green':'text-gray'"
							@tap="selectTimeIndex(0)" />
					</view>
					<view>
						<text class="text-xs">上午</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-xiawu " :class="timeIndex==1?'text-green':'text-gray'"
							@tap="selectTimeIndex(1)" />
					</view>
					<view>
						<text class="text-xs">下午</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-yueliang " :class="timeIndex==2?'text-green':'text-gray'"
							@tap="selectTimeIndex(2)" />
					</view>
					<view>
						<text class="text-xs">晚上</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray padding-sm  r">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-food2 " :class="foodIndex==0?'text-green':'text-gray'"
							@tap="selectFoodIndex(0)" />
					</view>
					<view>
						<text class="text-xs">餐前</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-kafei " :class="foodIndex==1?'text-green':'text-gray'"
							@tap="selectFoodIndex(1)" />
					</view>
					<view>
						<text class="text-xs">餐后</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-roundadd " :class="foodIndex==2?'text-green':'text-gray'"
							@tap="selectFoodIndex(2)" />
					</view>
					<view>
						<text class="text-xs">其他</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray padding-sm r">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub text-sl">
					<text class="cuIcon-shuidi text-green"></text>
				</view>
				<view class="flex-twice flex">
					<view class="flex-sub text-right ">
						<input type="number" class="text-xxl" placeholder="--" />
					</view>
					<view class="flex-sub text-left padding-left">
						<text class="text-xxl"> mg/dL</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white ">
			<text class="text-xs margin-left">注意：每次血糖检测需要间隔2小时以上</text>
		</view>
		<view class="cu-bar bg-white">
			<view class=" text-xxl">
				<text class="cuIcon-title  text-green"></text>
				<text class="text-xxl text-black text-bold">出汗情况</text>
				<text class="text-xs">(请添加出汗情况)</text>
			</view>
		</view>
		<view class="cu-bar flex bg-gray padding-sm  r">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-sunfilling" :class="sportIndex==0?'text-green':'text-gray'"
							@tap="selectSportIndex(0)" />
					</view>
					<view>
						<text class="text-xs">高温</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-favor " :class="sportIndex==1?'text-green':'text-gray'"
							@tap="selectSportIndex(1)" />
					</view>
					<view>
						<text class="text-xs">运动</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-kafei " :class="sportIndex==2?'text-green':'text-gray'"
							@tap="selectSportIndex(2)" />
					</view>
					<view>
						<text class="text-xs">饮食</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-roundadd " :class="sportIndex==3?'text-green':'text-gray'"
							@tap="selectSportIndex(3)" />
					</view>
					<view>
						<text class="text-xs">其他</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white  padding-sm">
		</view>
		<view class="cu-bar flex bg-gray padding-sm  r">
			<view class="  flex-sub flex text-center">
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-dian" :class="sweatIndex==0?'text-green':'text-gray'"
							@tap="selectSweatIndex(0)" />
					</view>
					<view>
						<text class="text-xs">少量汗</text>
					</view>
				</view>
				<view class="flex-sub">
					<view class="text-sl">
						<button class="cu-btn cuIcon-dian1 " :class="sweatIndex==1?'text-green':'text-gray'"
							@tap="selectSweatIndex(1)" />
					</view>
					<view>
						<text class="text-xs">较多汗</text>
					</view>
				</view>
				<view class="flex-sub ">
					<view class="text-sl flex">
						<view class="flex-sub text-right">
							<button class="cu-btn cuIcon-dian1 " :class="sweatIndex==2?'text-green':'text-gray'"
								@tap="selectSweatIndex(2)" />
						</view>
						<view class="flex-sub text-left">
							<button class="cu-btn cuIcon-dian " :class="sweatIndex==2?'text-green':'text-gray'"
								@tap="selectSweatIndex(2)" />
						</view>
					</view>
					<view>
						<text class="text-xs">大量汗</text>
					</view>
				</view>
			</view>

		</view>
		<view class="bg-white ">
			<text class="text-xs margin-left">注意：汗糖检测与血糖检测间隔间隔需在需在15分钟以内</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeIndex: 0,
				foodIndex: 0,
				sportIndex: 0,
				sweatIndex: 0
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
</style>
