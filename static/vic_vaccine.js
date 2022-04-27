
/************** Vaccine Dose Percentage in City of Melbourne **************/

// Round the number to certain percision
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/* Fetch from https://vaccinedata.covid19nearme.com.au

Origin:
https://www.health.gov.au/resources/collections/covid-19-vaccination-
geographic-vaccination-rates-sa3

Automatically Updated

*/

fetch('https://vaccinedata.covid19nearme.com.au/data/geo/air_sa4.json')
  .then(response => response.json())
  .then(data => {

    // Go to VIC -> Melbourne City
    let sa3_vaccine_vic = data.filter(a => a.STATE == "VIC")
    let sa3_vaccine_melb_city = data.filter(a => a.ABS_NAME == "Melbourne - Inner")

    // To get Date, Percentage of only one dose, fully vaccinated & not vaccinated
    let all_date = []
    let all_first_dose_per = [], all_second_dose_per = [], all_no_dose_per = []

    for (let i = 0; i < sa3_vaccine_melb_city.length; i++){

      let cur_date = sa3_vaccine_melb_city[i].DATE_AS_AT
      let cur_first_dose_per = sa3_vaccine_melb_city[i].AIR_FIRST_DOSE_PCT
      let cur_second_dose_per = sa3_vaccine_melb_city[i].AIR_SECOND_DOSE_PCT
      let only_first_dose_per = cur_first_dose_per - cur_second_dose_per
      let cur_no_dose_per = 100 - cur_first_dose_per

      all_date.push(cur_date)
      all_first_dose_per.push(round(only_first_dose_per, 1))
      all_second_dose_per.push(round(cur_second_dose_per, 1))
      all_no_dose_per.push(round(cur_no_dose_per, 1))
    }

    // echarts graph
    var chartDoma = document.getElementById('melb_city_vac');
    var myCharta = echarts.init(chartDoma);
    var optiona;

    optiona = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: "{value}%"
        },
      },
      yAxis: {
        type: 'category',
        data: all_date
      },
      series: [
        {
          name: 'Fully Vaccinated',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            // formatter: function(d){
            //   return d.data + "%"
            // }
          },
          emphasis: {
            focus: 'series'
          },
          data: all_second_dose_per,
          color: ["#007544"],
          markLine: {                 // Mark Line for 70%
               data: [{
                 name: 'Target',
                 xAxis: 70,
                 lineStyle: {
                    normal: {
                      type:'dashed',
                      color: 'green',
                      width: 3,
                    }
                  },
                }],
                label: {formatter: "70%"},
          }
        },
        {
          name: 'Only One Dose',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            // formatter: function(d){
            //   return d.data + "%"
            // }
          },
          emphasis: {
            focus: 'series'
          },
          data: all_first_dose_per,
          color: ["#a2bab2"],
          itemStyle: {
            decal: {
              symbol: "line",
              dashArrayX: [1,0],
              dashArrayY: [4,3],
              rotation: 0.999,
              dirty: false,
              symbolSize: 1,
              color: "#007544"},      // Pattern for the series
          },
        },
        {
          name: 'Not Vacciated',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            // formatter: function(d){
            //   return d.data + "%"
            // }
          },
          emphasis: {
            focus: 'series'
          },
          data: all_no_dose_per,
          color: ["#f0f0f0"]
        },
      ]
    };

    optiona && myCharta.setOption(optiona);

    });
