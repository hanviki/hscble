<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">设备</block>
		</cu-custom>
		<view class="bg-gray text-black padding-xl">
			<subDevice @longpress="longpress" @openSetting="openSetting" />
			<bluetoothSettings :setting="setting" :index="sindex" @hide="hideSetting" />
			<view class="cu-modal bottom-modal" :class="lgshow ? 'show' : ''" @tap="hideLgshow">
				<view class="cu-dialog" style="background-color: transparent;bottom: 50rpx;" @tap.stop="">
					<view class="margin"><button style="width: 80%;" class="cu-btn bg-orange lg" @tap="dispatch('disconnect', lgitem)">关闭连接</button></view>
					<view class="margin"><button style="width: 80%;" class="cu-btn bg-red lg" @tap="dispatch('delpaired', lgitem)">删除设备</button></view>
				</view>
			</view>
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
		// uni.onBLEConnectionStateChange(function (res) {
		//   // 该方法回调中可以用于处理连接意外断开等异常情况
		//   if(!res.connected)
		//   {
		// 	  if(that.$store.getters.getPaired.length>0){
		// 		  for (let item in that.$store.getters.getPaired) {
		// 		  	if(item.deviceId==res.deviceId){
		// 				if(item.status){
		// 					that.$store.dispatch('disconnect', item)
		// 				}
		// 			}
		// 		  }
		// 	  }
		//   }
		// })
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
	border-radius: 20rpx;
}
</style>
