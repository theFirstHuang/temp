// import * as echarts from 'echarts';

$.ajax({

  type:'GET',
  //data
  url:"http://127.0.0.1:2889/chart_data",
  dataType:'json',
  success:function(data){
      console.log(data);
      var chartDom = document.getElementById('hp_lineChart');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
      //   title: {
      //     text: 'House Price from 2017 to 2021 in Melbourne'
      //   },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['2017', '2018', '2019', '2020', '2021']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
           /* data: [
              1752534.3599999999, 1676329.3, 1651656.94, 1770922.6199999999,
              2021429.28
            ],*/
            data: data['data10'],
            type: 'line'
          }
        ]
      };

      option && myChart.setOption(option);
    }
});
