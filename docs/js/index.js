/**
 * Created by Administrator on 2017/6/14.
 */
$(function() {
  var mainMethod = {
    //创建图表
    createChart: function () {
      var data = {
        // labels 数据包含依次在X轴上显示的文本标签
        labels: ["基准版V3.1.2", "基准版V3.1.3", "基准版V3.1.4", "基准版V3.1.5", "基准版V3.1.6"],
        datasets: [{
          // 数据集名称，会在图例中显示
          label: "android",
          // 也可以不指定颜色主题，使用下面的值来分别应用颜色设置，这些值会覆盖color生成的主题颜色设置
          fillColor: "#38b03f",
          strokeColor: "#38b03f",
          pointColor: "#38b03f",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          // 数据集
          data: [11, 13, 14, 15, 18]
        },{
          // 数据集名称，会在图例中显示
          label: "ios",
          // 也可以不指定颜色主题，使用下面的值来分别应用颜色设置，这些值会覆盖color生成的主题颜色设置
          fillColor: "#ea644a",
          strokeColor: "#ea644a",
          pointColor: "#ea644a",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          // 数据集
          data: [12, 4, 11, 5, 18]
        }]
      };
      var options = {
        // String - 坐标刻度文本字体
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - 坐标刻度文本字体大小
        scaleFontSize: 12,


        // Boolean - 是否启用响应式设计，在窗口尺寸变化时进行重绘
        responsive: true,

        // Boolean - 当启用响应式设计时，是否在缩放时保持原始比例，如果设置为 false，则重新以新的容器大小进行绘制
        maintainAspectRatio: true,

        // Boolean - 是否在触摸或鼠标移动时显示工具提示文本
        showTooltips: true,

        // Boolean - 是否在绘制工具提示文本时使用自定义的函数
        customTooltips: false,

        // Array - 显示工具提示的触发事件
        tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],

        // String - 工具提示背景颜色
        tooltipFillColor: "rgba(0,0,0,1)",

        // String - 工具提示字体
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - 工具提示字体大小
        tooltipFontSize: 14,

        // String - 工具提示字体样式
        tooltipFontStyle: "normal",

        // String - 工具提示字体颜色
        tooltipFontColor: "#fff",

        // String - 工具提示标题字体
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - 工具提示标题字体大小
        tooltipTitleFontSize: 12,

        // String - 工具提示标题字体样式
        tooltipTitleFontStyle: "bold",

        // String - 工具提示标题字体颜色
        tooltipTitleFontColor: "#fff"
      }
      var homeChart = $("#home-chart").barChart(data, options);
    }
  };
  mainMethod.createChart();
})