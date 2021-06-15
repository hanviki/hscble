<template>
	<view>
		<cu-custom bgColor="bg-cyan" :isBack="false">
			<block slot="content">设备</block>
		</cu-custom>
		<view class="bg-gray text-black padding-xl">
			<subDevice  />
			<!-- <bluetoothSettings :setting="setting" :index="sindex" @hide="hideSetting" /> -->
			<!-- <view class="cu-modal bottom-modal" :class="lgshow ? 'show' : ''" @tap.stop="hideLgshow">
				<view class="cu-dialog" style="background-color: transparent;bottom: 50rpx;" >
					<view class="margin"><button style="width: 80%;" class="cu-btn bg-orange lg" @tap.stop="dispatch('disconnect', lgitem)">关闭连接</button></view>
					<view class="margin"><button style="width: 80%;" class="cu-btn bg-red lg" @tap.stop="dispatch('delpaired', lgitem)">删除设备</button></view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import bluetoothSettings from '@/components/bluetooth-settings.vue';
import subDevice from '@/components/subDevice.vue'
export default {
	data() {
		return {
			lgshow: false,
			lgitem: null,
			setting: false,
			sindex: null
		};
	},
	components: {
		bluetoothSettings, subDevice
	},
	onShow(){
			setTimeout(()=>{
				uni.$emit('timerEmit')
				},500)
		},
		onHide(){
			console.info('hide')
				uni.$emit('timerCancel')
			},
	onLoad() {
		let that= this
		/**
		 * 关闭手机蓝牙时候 关闭蓝牙适配器
		 * @param {Object} res
		 */
		uni.onBluetoothAdapterStateChange(function (res) {
		  if(!res.available){
			  that.$store.dispatch('closeBluetoothAdapter')
		  }
		})
		uni.onBLEConnectionStateChange(function (res) {
		  // 该方法回调中可以用于处理连接意外断开等异常情况
		  if(!res.connected)
		  {
			  console.info(res.deviceId)
			  if(that.$store.getters.getPaired.length>0){
				  console.info(88888)
				 // console.info(that.$store.getters.getPaired)
				  var paired= that.$store.getters.getPaired;
				 // console
				  var index = paired.findIndex(item => {
				  	return item.deviceId == res.deviceId;
				  });
				  console.info(index)
				  if(paired[index].status){
					  console.info(233322222222)
					  that.dispatch('disconnectAuto', paired[index])
				  }
			  }
		  }
		})
	},
	props: {
		show: {
			type: Boolean
		}
	},
	methods: {
		longpress(item) {
			this.lgshow = true;
			this.lgitem = item;
		},
		hideLgshow() {
			this.lgitem = null;
			this.lgshow = false;
		},
		openSetting(index) {
			this.sindex = index;
			this.setting = true;
		},
		hideSetting() {
			this.sindex = null;
			this.setting = false;
		},
		// 使用store的函数
		dispatch(name, item) {
			this.lgshow = false;
			this.$store.dispatch(name, item);
		}
	}
};
</script>

<style>
.r {
	border-radius: 30rpx;
}
</style>
