<template>
  <div>
    <div id="box" style="width: 100%; height: 500px" />
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts-wordcloud";
export default {
  name: "VueWordCloud",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      worddata: [
        {
          name: " 特斯拉Model S",
          value: 30,
        },
        {
          name: "天生要强",
          value: 24,
        },
        {
          name: " 华为p20",
          value: 21,
        },
        {
          name: "杜兰特",
          value: 19,
        },
        {
          name: "三只松鼠",
          value: 18,
        },
        {
          name: "Mac Pro",
          value: 18,
        },
        {
          name: "Iphone12 Pro",
          value: 17,
        },
        {
          name: "玛莎拉蒂",
          value: 12,
        },
        {
          name: "小米手机",
          value: 12,
        },
        {
          name: "保时捷",
          value: 11,
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.initChart(this.id);
  },
  methods: {
    initChart(id) {
      var myChart = echarts.init(document.getElementById("box"), "dark");

      const option = {
        // title: {
        //   text: "热门搜索词",
        // },
        // backgroundColor: "#fff",

        tooltip: {
          trigger: "item",
          confine: true,
          backgroundColor:"rgba(10, 22, 49.33)",
         textStyle: {
      color: "#ffffff"
    },
        },
        backgroundColor:"rgba(0, 0, 0, 0.33)",
        series: [
          {
            type: "wordCloud",
            // 用来调整词之间的距离
            gridSize: 3,
            // 用来调整字的大小范围
            sizeRange: [30, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            // rotationRange: [0, 0],
            // 随机生成字体颜色
            width: 800,
            height: 500,
            // maskImage: maskImage,
            // textStyle: {
            //   color: "rgb(214,20,15)",
            // },
            textStyle: {
              color: function () {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 160) +
                  ", " +
                  Math.round(Math.random() * 160) +
                  ", " +
                  Math.round(Math.random() * 160) +
                  ")"
                );
              },
              emphasis: {
                            shadowBlur: 5,
                            shadowColor: '#333'
                        }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            // 数据
            data: this.worddata,
          },
        ],
      };
      // myChart.setOption(option);
      // 加载图像，将数据放在图像中
      myChart.setOption(option);
    },
  },
};
</script>
