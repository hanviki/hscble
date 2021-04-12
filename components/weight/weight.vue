<template>
	<view>
		<scroll-choose @scroll="scroll_weight" :scrollStart="scrollStart_weight" :scrollEnd="scrollEnd_weight" :scrollLeft="scrollLeft_weight" :maginL="maginL"></scroll-choose>
	</view>
</template>

<script>
	import scrollChoose from '@/components/scroll-choose/scroll-choose.vue'
	export default {
		data() {
			return {
				maginL: 5, //线间距
				scrollLeftNow_weight: 60, //页面显示
				scrollLeft_weight: 60, //初始值
				scrollStart_weight: 10, //滚动区域起始值
				scrollEnd_weight: 200, //滚动区域终止值
			}
		},
		methods: {
			scroll_weight(val) {
			this.scrollLeftNow_weight = val
				this.$emit("scroll",val)
			}
		}
	}
</script>

<style>

</style>
