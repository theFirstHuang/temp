// import * as echarts from 'echarts';

var chartDom = document.getElementById('histogram');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
        text: 'Comparison of positive sentiment in major cities',
        left: 'center'
  },
  tooltip:{
    trigger: 'item'
  },
  xAxis: {
    type: 'category',
    data: ['Melbourne', 'Sydney', 'Perth', 'Adelaide', 'Brisbane']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [
        {
          value: 120,
          itemStyle: {
            color: '#a90000'
          }
        },
        150,
        80,
        70,
        110,
        130
      ],
      type: 'bar'
    }
  ]
};

option && myChart.setOption(option);
