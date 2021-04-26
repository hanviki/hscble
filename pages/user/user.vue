<template name="basics">
	<view class="bg-white">
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
				<view class=" flex">
					<view class="flex-sub flex">
						<view class="flex-sub text-center">
							<!-- style="background-image:url(../../static/image/man.png);background-repeat: no-repeat;background-position: center;background-size: contain;-->
							<view class="bg-white  margin-right-sm flex justify-center" style="width: 100%;height:100px;background-image:url(../../static/image/man.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
									
							</view>
							<radio class='flex-sub  radio text-left' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
						</view>
					</view>
					<view class="flex-sub flex">
						<view class="flex-sub text-center">
							<!-- style="background-image:url(../../static/image/man.png);background-repeat: no-repeat;background-position: center;background-size: contain;-->
							<view class="bg-white  margin-right-sm flex justify-center" style="width: 100%;height:100px;background-image:url(../../static/image/woman.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
									
							</view>
							<radio class='flex-sub  radio text-left' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
						</view>
					</view>
<!-- 
					<view class="flex-sub flex">
						<view class="flex-sub text-center ">
							<radio class='flex-sub  radio text-left' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
							<view class=" lg  bg-white margin-right margin-left-sm" style="background-image:url(../../static/image/woman.png);height: 100upx;"></view>
						</view>
					</view> -->

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
					<text class="text-center text-xxl">您的生日是:{{pickerDate}}</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex" @tap="openBirModal">
				<view class=" flex-sub text-center text-xxl">
					{{pickerDate}}
				</view>
			</view>
			<button class="cu-btn block bg-green margin-sm lg" @tap="submitUser"> 提交数据 </button>
		</form>
     <view class="cu-modal bottom-modal padding-bottom-xl" style="height: 100vh;" :class="birthShow?'show':''">
		   <gpp-date-picker  @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate"
		   	:endDate="endDate" :defaultValue="pickerDate">
		   </gpp-date-picker>
		</view>
	</view>
</template>

<script>
	import scrollWeight from '@/components/weight/weight.vue'
	import scrollHeight from '@/components/height/height.vue'
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		name: "login",
		components: {
			scrollHeight,
			scrollWeight,
			gppDatePicker
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
				
				birthShow: false,
				startDate: "1920-01-01",
				endDate: this.getCurrentDate(),
				pickerDate: '1980-01-01'
			}
		},
		computed:{
			
		},
		mounted() {
		},
		created() {

		},
		methods: {
			getCurrentDate() {
				var date = new Date();
			
				var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
				var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
				var day = date.getDate();
				return year + "-" + month + "-" + day;
			},
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
			
			openBirModal() {
				this.birthShow =true
			},
			onCancel(e) {
				this.birthShow = false;
			},
			onConfirm(e) {
				var that = this
				that.pickerDate = e.dateValue;
				this.birthShow = false;
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
					Account: this.$store.getters.getTelphone,
					Pwd: this.$store.getters.getPwd,
					Height: this.scrollLeftNow,
					Weight: this.scrollLeftNow_weight,
					Birthday: this.pickerDate
				}).then(res=>{
					if(res.Code=='1'){
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
					else {
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
</style>
