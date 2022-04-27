
var chartDom = document.getElementById('pie_chart');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: 'Sentiment of government',
    subtext: 'From Twitter Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Positive' },
        { value: 580, name: 'Negative' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);
