<template name="basics">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<form>
			<view class="cu-form-group text-center flex">
				<view class="text-center flex-sub">
					<text class="text-center text-xxl">您的性别是：</text>
				</view>
			</view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group flex">
					<view class="flex-sub flex">
						<view class="flex-sub text-center">
							<view class="cu-avatar lg  bg-white margin-left margin-right-sm" style="background-image:url(static/image/man.png)"></view>
							<radio class='flex-sub  radio text-left' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
						</view>
					</view>

					<view class="flex-sub flex">
						<view class="flex-sub text-center ">
							<radio class='flex-sub  radio text-left' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
							<view class="cu-avatar lg  bg-white margin-right margin-left-sm" style="background-image:url(static/image/woman.png)"></view>
						</view>
					</view>

				</view>
			</radio-group>
			<view class="cu-form-group text-center flex padding-xl">
				<view class="text-center flex-sub">
					<text class="text-center text-xxl">您的身高是：{{scrollLeftNow}} cm</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex">
				<view class="text-center flex-sub">
					<scroll-height @scroll="scroll"></scroll-height>
				</view>
			</view>
			<view class="cu-form-group text-center flex padding-xl">
				<view class="text-center flex-sub">
					<text class="text-center text-xxl">您的体重是：{{this.scrollLeftNow_weight}} KG</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex">
				<view class="text-center flex-sub">
					<scroll-weight @scroll="scroll_weight"></scroll-weight>
				</view>
			</view>
			<view class="cu-form-group text-center flex padding-xl">
				<view class="text-center flex-sub">
					<text class="text-center text-xxl">您的生日是:{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}-{{multiArray[2][multiIndex[2]]}}</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex">
				<view class=" flex-sub flex">
					<picker class="flex flex-sub" mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
						<view class="picker flex-sub">
							{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}-{{multiArray[2][multiIndex[2]]}}
						</view>
					</picker>
				</view>
			</view>
			<button class="cu-btn block bg-green margin-sm lg" @tap="submitUser"> 提交数据 </button>
		</form>

	</view>
</template>

<script>
	import scrollWeight from '@/components/weight/weight.vue'
	import scrollHeight from '@/components/height/height.vue'
	
	export default {
		name: "login",
		components: {
			scrollHeight,
			scrollWeight
		},
		data() {
			return {
				radio: 1,
				imgList: [],
				registerForm: {
					telphone: "",
					validCode: "",
					password1: "",
					password2: ""
				},
				NumValue: 0,
				scrollLeftNow: 170, //页面显示
				scrollLeftNow_weight: 60,
				multiArray: [
					[],
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ,'13' ,'14' ,'15' ,'16','17' ,'18','19' ,'20' ,'21', '22' ,'23' ,'24', '25' ,'26','27','28','29','30','31']
				],
				multiIndex: [0, 0, 0],
			}
		},
		computed:{
			
		},
		mounted() {
			console.info(22)
			let now = (new Date()).getFullYear()
			let year_arr = []
			for (var i = 1920; i < now; i++) {
				this.multiArray[0].push(i);
			}
			//this.multiArray[0] = year_arr
		},
		created() {

		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			endEvent(val) {
				console.log(val)
			},
			scroll(val) {
				this.scrollLeftNow = val
			},
			scroll_weight(val) {
				this.scrollLeftNow_weight = val
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			getDays(year, month) {
				let days = []

				var d = (new Date(year, month, 0)).getDate();
				console.info(d)
				for (let i = 1; i <= d; i++) {
					days.push(i);
				}
				return days;
			},
			MultiColumnChange(e) {
				
			},
		    submitUser () {
				this.$api.user.postuser({
					Phone: this.$store.getters.getTelphone,
					Height: this.scrollLeftNow,
					Weight: this.scrollLeftNow_weight,
					Birthday: this.multiArray[0][this.multiIndex[0]]+'-'+this.multiArray[1][this.multiIndex[1]]+'-'+this.multiArray[2][this.multiIndex[2]]
				})
			}
		}
		}
</script>


<style>
</style>
