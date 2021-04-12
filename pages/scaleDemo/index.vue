
<template>
  <div class="content">
    <div>
      <view class='scale-title'>横向没有小数点</view>
      <view class='scale-value'>{{horizontaNoPointVal}}</view>
      <vue-scale :min="10"
                 :max="50"
                 :int="true"
                 :single="10"
                 :h="80"
                 :active="36"
                 :styles="styles"
                 @value="horizontaNoPointMethods"/>
    </div>
    <div>
      <view class='scale-title'>横向有小数点</view>
      <view class='scale-value'>{{horizontaPointVal}}</view>
      <vue-scale :min="10"
                 :max="50"
                 :int="false"
                 :single="10"
                 :h="80"
                 :active="36.1"
                 :styles="styles"
                 @value="horizontaPointMethods"/>
    </div>
    <div>
      <view class='scale-title'>竖向没有小数点</view>
      <view class='scale-container'>
        <view class='scale-value'>{{verticalNoPointVal}}</view>
        <view class='scale-view'>
          <vue-scale :min="10"
                     :max="100"
                     direction="vertical"
                     :int="true"
                     :single="10"
                     :h="80"
                     :active="36"
                     :styles="styles"
                     @value="verticalNoPointMethods"/>
        </view>
      </view>
    </div>
    <div>
      <view class='scale-title'>竖向有小数点</view>
      <view class='scale-container'>
        <view class='scale-value'>{{verticalPointVal}}</view>
        <view class='scale-view'>
          <vue-scale
            :min="10"
            :max="50"
            :int="false"
            :single="10"
            :h="40"
            :active="36.1"
            :styles="styles"
            direction="vertical"
            @value="verticalPointMethods"/>
        </view>
      </view>
    </div>
  </div>
</template>

<script>
import vueScale from '@/components/sapling-vue-scale/sapling-vue-scale.vue';

//   min[number] 默认值 0, // 最小值
//   max[number] 默认值 100, // 最大值
//   int[boolean] 默认值 true, // 是否开启整数模式 ，false为小数模式 true 整数模式
//   single[number] 默认值 10, // 单个格子的实际长度（单位px）最好不要去改
//   h[number] 默认值 0,// 自定义高度 初始值为80
//   active[null] 默认值 center ，// 自定义选中位置  （三个值 min, max ,center , 范围内合法数值）
// styles[object]  // 自定义卡尺样式
export default {
  name: '',
  components: {
    vueScale,
  },
  data() {
    return {
      weight: 11,
      height: 180,
      styles: {
        line: '#dbdbdb',
        bginner: '#fbfbfb',
        bgoutside: '#ffffff',
        font: '#404040',
        fontColor: '#404040',
        fontSize: 16,
      },
      horizontaPointVal: '',
      horizontaNoPointVal: '',
      verticalPointVal: '',
      verticalNoPointVal: '',
    };
  },
  mounted() {
  },
  methods: {
    // 横向滚动有小数点
    horizontaPointMethods(msg) {
      this.horizontaPointVal = msg;
    },
    // 横向滚动没有小数点
    horizontaNoPointMethods(msg) {
      this.horizontaNoPointVal = msg;
    },
    // 竖向滚动有小数点
    verticalPointMethods(msg) {
      this.verticalPointVal = msg;
    },
    // 竖向滚动没有小数点
    verticalNoPointMethods(msg) {
      this.verticalNoPointVal = msg;
    },
  },
};
</script>

<style lang="less" scoped>
  .content {
    display: flex;
    flex-direction: column;
    padding: 0 30rpx 30rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
  }
  .container {
    padding: 0 40rpx;
  }
  .scale-value{
    text-align: center;
    color: #6643e7;
  }
  .scale-title{
    margin-top: 50rpx;
  }
  .scale-container{
    display: flex;
  }
  .scale-container .scale-value{
    flex: 1;
    line-height: 600rpx;
  }
  .scale-view{
    width: 200rpx;
    height: 600rpx;
    flex: 1;
  }
</style>
