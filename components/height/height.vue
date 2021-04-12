<template>
	<view>
		<scroll-choose @scroll="scroll" :scrollStart="scrollStart" :scrollEnd="scrollEnd" :scrollLeft="scrollLeft" :maginL="maginL"></scroll-choose>
	</view>
</template>

<script>
	import scrollChoose from '@/components/scroll-choose/scroll-choose.vue'
	export default {
		data() {
			return {
				scrollLeftNow: 170, //页面显示
				scrollLeft: 170, //初始值
				scrollStart: 50, //滚动区域起始值
				scrollEnd: 230, //滚动区域终止值
				maginL: 5, //线间距
			}
		},
		methods: {
			scroll(val) {
			    this.scrollLeftNow = val
				this.$emit("scroll",val)
			}
		}
	}
</script>

<style>

</style>
