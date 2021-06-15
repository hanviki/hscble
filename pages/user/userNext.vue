<template name="basics">
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<form>
			<view class="cu-form-group text-center flex padding-xl">
				<view class="text-center flex-sub">
					<text class="text-center text-bold">您的体重是?</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex">
				<view class="text-center flex-sub">
					<scroll-weight @scroll="scroll_weight"></scroll-weight>
				</view>
			</view>
			<view class="cu-form-group text-center flex padding-xl">
				<view class="text-center flex-sub">
					<text class="text-center text-bold">您的生日是?</text>
				</view>
			</view>
			<view class="cu-form-group text-center flex" @tap="openBirModal">
				<view class=" flex-sub text-center text-xxl">
					{{pickerDate}}
				</view>
			</view>
			<view  style="margin-top: 40px;">
			<button style="background-color: #1CBBB4;" class="cu-btn block margin-left-sm margin-right-sm text-white lg" @tap="submitUser"> 提交数据 </button>
			</view>
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
		onLoad(e) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2];
			
		    this.scrollLeftNow = beforePage.$vm.getHeight();
			this.radio = beforePage.$vm.getSex();
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
					Birthday: this.pickerDate,
					Sexy: this.radio.toString()
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
