<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="cu-list menu">
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal">
				<view class="content flex">
					<view class="flex-sub"><text class="text-grey text-left">头像</text></view>
					<view class="flex-sub text-right">
						<view class="cu-avatar round lg " :style="[{ backgroundImage:'url(' + userInfo.photo + ')' }]">
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="openNick">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">用户昵称</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Nickname}}
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">用户名</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Account}}
					</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showSexModal">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">性别</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Sex}}
					</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="openBirModal">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">出生日期</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Birthday}}
					</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="openWeight">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">体重</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Weight}} KG
					</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="openHeight">
				<view class="content flex">
					<view class="flex-sub">
						<text class="text-grey">身高</text>
					</view>
					<view class="flex-sub text-right">{{userInfo.Height}} CM
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="updateUserImage">确定</view>
				</view>

				<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalSexName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideSexModal">取消</view>
					<view class="action text-green" @tap="updateUserSex">确定</view>
				</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'男'}}
					</view>
				</picker>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="birthShow?'show':''">
		   <gpp-date-picker  @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate"
		   	:endDate="endDate" :defaultValue="pickerDate">
		   	{{pickerDate}}
		   </gpp-date-picker>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		data() {
			return {
				menuArrow: true,
				modalName: null,
				modalSexName: null,
				imgList: [],
				index: -1,
				picker: ['男', '女'],
				birthShow: false,
				startDate: "1920-01-01",
				endDate: this.getCurrentDate(),
				pickerDate: '1980-01-01'
			}
		},
		components: {
			gppDatePicker
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			getCurrentDate() {
				var date = new Date();

				var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
				var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
				var day = date.getDate();
				return year + "-" + month + "-" + day;
			},
			hideModal() {
				this.modalName = null
			},
			hideSexModal() {
				this.modalSexName = null
			},
			showModal() {
				this.modalName = 'bottomModal'
				this.imgList = []
			},
			showSexModal() {
				this.modalSexName = 'bottomModal'
				this.index = -1
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


				that.$api.user.putuser({
						Id: that.userInfo.Id,
						Birthday: that.pickerDate
					})
					.then(res => {
						if (res.code == '1') {
							that.birthShow = false;
							that.userInfo.Birthday = that.pickerDate
							that.$store.dispatch('updateUser', userInfo)
							that.pickerDate ='1980-01-01'
						} else {
							uni.showToast({
								icon: "none",
								title: "提交数据出错，请联系管理员",
							})
						}
					})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = res.tempFilePaths
					}
				});
			},
			openNick() {
				uni.navigateTo({
					url: '/pages/user/nickname'
				})
			},
			openWeight() {
				uni.navigateTo({
					url: '/pages/user/weight'
				})
			},
			openHeight() {
				uni.navigateTo({
					url: '/pages/user/height'
				})
			},
			updateUserSex() {
				var that = this
				that.$api.user.putuser({
						Id: that.userInfo.Id,
						Sex: that.picker[that.index == -1 ? 0 : 1]
					})
					.then(res => {
						if (res.code == '1') {
							that.hideSexModal()
							that.index = -1
							that.userInfo.Sex = that.picker[that.index == -1 ? 0 : 1]
							that.$store.dispatch('updateUser', userInfo)
						} else {
							uni.showToast({
								icon: "none",
								title: "提交数据出错，请联系管理员",
							})
						}
					})

			},
			updateUserImage() {
				var that = this
				that.$api.user.putuser({
						Id: that.userInfo.Id,
						pic: that.imgList[0]
					})
					.then(res => {
						if (res.code == '1') {
							that.hideModal()
							that.imgList = []
							that.userInfo.photo = that.imgList[0]
							that.$store.dispatch('updateUser', userInfo)
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

</style>
