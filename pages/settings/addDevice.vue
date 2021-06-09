<template>
	<view class="bg-white" style="height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加设备</block>
		</cu-custom>
		<view class="r text-center" style="height: 20vh;font-size: 320rpx;" v-if="upShow">
			<text :class="changing?'text-green':'text-gray'" class="cuIcon-wifi"></text>
		</view>
		<view class="padding-top margin-top-xl text-center text-green" v-if="upShow">
			{{devicesList.length == 0 ?'正在扫描中...':'扫描到以下设备'}}</view>
		<scroll-view v-if="upShow" scroll-y="true" class="r" show-scrollbar="true">
			<view class="r margin-top-sm bg-cyan light" v-for="(item, index) in devicesList" :key="index"
				@tap.stop="dispatch('createBLEConnection', item)">
				<view class="flex">
					<view style="flex-basis: 30%;" class="padding-sm text-center text-xsl">
						<text class="cuIcon-rankfill text-green"></text>
					</view>
					<view style="flex-basis: 70%;" class="padding-sm radius  text-center justify-center">
						<view class="text-black">
							{{item.name}}
						</view>
						<view class=" margin-top-xl text-center">
							<text class="text-green" @tap.stop="openAdd(item)">添加设备</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="!upShow" class="text-center justify-center margin-top-xsl" >
			<view class="flex" style="height: 20vh;">
				<view class="flex-sub " style="font-size: 200rpx;">
					<text :class="changing || isMatch?'text-green':'text-gray'" class="cuIcon-mobile"></text>
				</view>
				<view class="flex-sub text-xsl margin-top-xl ">
					<text :class="isMatch?'cuIcon-roundcheck':'cuIcon-dian1'" class="text-green"></text>
				</view>
				<view class="flex-sub " style="font-size: 200rpx;">
					<text :class="!changing || isMatch?'text-green':'text-gray'" class="cuIcon-wifi"></text>
				</view>
			</view>
		
		<view class=" text-center">
			<text class="text-green">{{isMatch?'配对成功':'正在配对中...'}}</text>
		</view>
		<view class=" text-center padding-xl">
			<text class="text-gray">{{isMatch?matchData:'请在穿戴设备侧进行配对确认'}}</text>
		</view>
		<view class=" text-center  cu-bar btm  padding-xl">
			<text class="text-green">当前配对设备: {{deviceName}} </text>
		</view>
</view>
	</view>
</template>

<script>
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	export default {
		data() {
			return {
				devicesList: this.$store.getters.getDevicesList, // 可用设备列表
				changing: true,
				isOpenBle: this.$store.getters.getIsOpenBle, // 是否开启蓝牙
				paired: this.$store.getters.getPaired, // 已配对设备列表
				bledd: this.$store.getters.getBledd, // 是否启用蓝牙搜索
				pairedIndex: 0,
				deviceName: '',
				s2: 0,
				currentParied: {},
				upShow: true,
				isMatch: false,
				matchData: '您的手环已配对成功,个人数据将通过APP在手机和穿戴设备间同步.可通过接触绑定来终止以上数据的同步.'
			}
		},
		components: {
			cmdCircle
		},
		onShow() {
			this.openBle()
			let that = this
			var s = 0
			setTimeout(() => {
				if (that.isOpenBle) {
					that.dispatch('openbledd')
					s = setInterval(that.changeColor, 200)
					setTimeout(() => {
						that.dispatch('openbledd')
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
						this.isMatch =true
						setTimeout(() => {
							uni.$emit('handleElec',this.currentParied)
							//that.getElectic(item)
						}, 200)
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
