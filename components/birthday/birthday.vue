<template>
	<view>
		<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
			<view class="picker">
				{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}-{{multiArray[2][multiIndex[2]]}}
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				multiArray: [
					[],
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					['1', '2']
				],
				multiIndex: [0, 0, 0],
			}
		},
		mounted() {
			console.info(22)
			let now = (new Date()).getFullYear()
			let year_arr =[]
			for( var i=1920;i<now;i++){
				this.multiArray[0].push(i);
			}
			//this.multiArray[0] = year_arr
		},
		methods: {
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			getDays (year,month) {
				let days =[]
				
				var d = (new Date(year,month,0)).getDate();
				console.info(d)
				for( let i=1;i<d;i++){
					days.push(i);
				}
				return days;
			},
			MultiColumnChange(e) {
				console.info(e.detail.column)
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				console.info(data.multiArray[1][data.multiIndex[1]])
				data.multiArray[2] = this.getDays(data.multiArray[0][data.multiIndex[0]],data.multiArray[1][data.multiIndex[1]])
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			
		}
	}
</script>

<style>

</style>
