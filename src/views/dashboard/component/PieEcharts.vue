<template>
  <div>
    <div id="purcle" ref="pieEchartsBox" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("purcle"), "dark");
    // 绘制图表
    var options = {
      title: {
        text: "购买终端",
        // 标题字体样式
        textStyle: {
          color: "#9AA8D4",
          fontSize: 22,
          fontWeight: "normal",
        },
      },
      backgroundColor: "rgba(10, 22, 49,.5)",
      // hover扇面时候显示的内容 b是data的name  c是data的value
      tooltip: {
        trigger: "item",
        formatter: "{b}数量 : {c}个;占比 ({d}%)",
        backgroundColor: "rgba(10, 22, 49,.33)",
        textStyle: {
          color: "#ffffff",
        },
      },
      series: [
        {
          name: "面积模式",
          type: "pie",
          // 最外圈和最内圈的比例大小
          radius: ["25%", "50%"],
          roseType: "area",
          data: [
            {
              value: 25,
              name: "Android",
              label: {
                normal: {
                  textStyle: {
                    // 字体颜色渐变  扇颜色保持一致
                    color: "#4B4CDC",
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  // 渐变柱状图
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#6D48DC" }, // 柱图渐变色
                    { offset: 0.5, color: "#6D48DC" }, // 柱图渐变色
                    { offset: 1, color: "#4B4CDC" }, // 柱图渐变色
                  ]),
                },
              },
            },
            {
              value: 20,
              name: "ios",
              label: {
                normal: {
                  // 字体颜色
                  textStyle: {
                    color: "#248DFF",
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  // 渐变柱状图
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#24C9FF" }, // 柱图渐变色
                    { offset: 0.5, color: "#24ABFF" }, // 柱图渐变色
                    { offset: 1, color: "#248DFF" }, // 柱图渐变色
                  ]),
                },
              },
            },
            {
              value: 15,
              name: "PC Web",
              label: {
                normal: {
                  textStyle: {
                    color: "#BD00FF",
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  // 渐变柱状图
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#D200FF" }, // 柱图渐变色
                    { offset: 0.5, color: "#BD00FF" }, // 柱图渐变色
                    { offset: 1, color: "#BD00FF" }, // 柱图渐变色
                  ]),
                },
              },
            },

            {
              value: 5,
              name: "Wap Web",
              label: {
                normal: {
                  textStyle: {
                    color: "#70218F",
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  // 渐变柱状图
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#8A1D89" }, // 柱图渐变色
                    { offset: 0.5, color: "#7C1D8C" }, // 柱图渐变色
                    { offset: 1, color: "#70218F" }, // 柱图渐变色
                  ]),
                },
              },
            },
          ],
        },
      ],
    };
    myChart.setOption(options);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#purcle {
  width: 300px;
  height: 300px;
}
</style>
