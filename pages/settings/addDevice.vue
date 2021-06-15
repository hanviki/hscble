<template>
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-cyan" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加设备</block>
		</cu-custom>
		<!-- <view class="r text-center" style="height: 20vh;font-size: 320rpx;" v-if="upShow">
			<text :class="changing?'text-green':'text-gray'" class="cuIcon-wifi"></text>
		</view> -->
		
		<view v-if="upShow" :animation="animationData" style="width: 200px;height:200px; margin-left: 80px;" >
			<image src="../../static/image/scan.png" style="width: 200px;height:200px;"></image>
		</view>
	
		<view class="padding-top margin-top-xl text-center" :class="devicesList.length ==0?'text-green':'text-gray'" v-if="upShow">
			{{devicesList.length == 0 ?scanString:'扫描到以下设备'}}
		</view>
		<scroll-view v-if="upShow" scroll-y="true" class="r" show-scrollbar="true">
			<view class="r margin-top-sm bg-cyan light" v-for="(item, index) in devicesList" :key="index"
				@tap.stop="dispatch('createBLEConnection', item)">
				<view class="flex">
					<view style="flex-basis: 30%;" class="padding-sm text-center text-xsl">
						<view class="  margin-right-sm flex justify-center" style="width: 100%;height:65px;background-image:url(../../static/image/gclock.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
						</view>
					</view>
					<view style="flex-basis: 70%;" class="padding-sm radius  text-center justify-center">
						<view class="text-black text-bold">
							{{item.name}}
						</view>
						<view class=" margin-top-xl text-center">
							<text class="text-green" @tap.stop="openAdd(item)">添加设备</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="!upShow" class="text-center justify-center margin-top-xsl">
			<view class="flex" >
				<view class="flex-sub " >
					<view style="width: 100%;height:200px;background-image:url(../../static/image/phone.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
					</view>
				</view>
				<view class="flex-sub padding-top-xxl ">
					<view v-if="isMatch" style="margin-top: 80px;width: 100%;height:60px;background-image:url(../../static/image/dui.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
					</view>
						<view style="margin-top: 100px;"><text v-if="!isMatch" class="text-green text-xl">匹配中...</text></view>
				</view>
				<view class="flex-sub ">
					<view style="width: 100%;height:200px;background-image:url(../../static/image/gclock.png);background-repeat: no-repeat;background-position: center;background-size: contain;">
					</view>
				</view>
			</view>

			<view class=" text-center ">
				<text class="text-green">{{isMatch?'配对成功':'正在配对中...'}}</text>
			</view>
			<view class=" text-center padding-xl">
				<text class="text-gray">{{isMatch?matchData:'请在穿戴设备侧进行配对确认'}}</text>
			</view>
			
		</view>
		<view class=" text-center  cu-bar btm  padding-xl">
			<text class="text-green">当前配对设备: {{deviceName}} </text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 在data中初始化animationData
				animationData: {},
				devicesList: this.$store.getters.getDevicesList, // 可用设备列表
				changing: true,
				isOpenBle: this.$store.getters.getIsOpenBle, // 是否开启蓝牙
				paired: this.$store.getters.getPaired, // 已配对设备列表
				bledd: this.$store.getters.getBledd, // 是否启用蓝牙搜索
				pairedIndex: 0,
				deviceName: '',
				s2: 0,
				scanString: '正在扫描中...',
				currentParied: {},
				upShow: true,
				isMatch: false,
				matchData: '您的手环已配对成功,个人数据将通过APP在手机和穿戴设备间同步.可通过接触绑定来终止以上数据的同步.'
			}
		},
		components: {

		},
		onload() {
			
			// 创建动画实例
		},
		onUnload() {
			this.animationData = {}
			// 页面关闭后清空数据
		},
		onBackPress() {
			console.info(88888)
			uni.$emit("onBack")
		},
		onShow() {
			this.openBle()
			this.animation = uni.createAnimation()
			let that = this
			var s = 0
			setTimeout(() => {
				if (that.isOpenBle) {
					that.dispatch('openbledd')
					//s = setInterval(that.changeColor, 200)
					that.running()
					setTimeout(() => {
						that.dispatch('openbledd')
						that.scanString ='扫描已结束'
						clearInterval(s)
					}, 5000)
				}
			}, 500)
		},

		watch: {
			'$store.state.bluetooth': {
				handler(e) {
					this.isOpenBle = e.isOpenBle;
					this.paired = e.paired;
					this.bledd = e.bledd;
					this.devicesList = e.devicesList;
					if (this.currentParied.status) {
						clearInterval(this.s2)
						this.isMatch = true
					}

				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 使用store的函数
			dispatch(name, item) {
				this.$store.dispatch(name, item);
			},
			openBle(e) {
				this.dispatch('openBluetoothAdapter');
			},
			closeBle(e) {
				this.dispatch('closeBluetoothAdapter');
			},
			changeColor() {
				this.changing = !this.changing
			},
			openAdd(item) {
				this.deviceName = item.name
				this.dispatch('createBLEConnection', item)
				this.currentParied = item
				this.upShow = false
				let that = this
				that.s2 = setInterval(that.changeColor, 200)

			},
			running() {
				console.info(this.animation)
				this.animation.rotate(1080).step({
					duration: 5000
				})
				// 调用实例的方法来描述动画,translateX定义动画类型为x轴偏移, 500为偏移长度, 单位px
				// 调用 step() 来表示一组动画完成(当前参数动画时间1s)
				// step 可以配置参数用于指定当前组动画的配置。具体参数请看文档
				this.animationData = this.animation.export()
				// export方法导出动画数据
			}
		}
	}
</script>

<style>
	.btm {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
	}

	.r {
		border-radius: 30rpx;
	}
</style>
