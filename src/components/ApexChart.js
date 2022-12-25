import Chart from "react-apexcharts";
import React from "react";
import * as dayjs from "dayjs";

class ApexChart extends React.Component {
  render() {
    let data_entry = this.props.stocksdata.map((item) => {
      let tmp = {};
      tmp = {
        x: item["Date"],
        y: [item.open, item.high, item.low, item.close],
      };
      return tmp;
    });
    this.state = {
      series: [
        {
          data: data_entry,
        },
      ],
      options: {
        chart: {
          type: "candlestick",
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "category",
          labels: {
            formatter: function (val) {
              return dayjs(val).format("MMM DD");
            },
          },
        },
        yaxis: {
          show: false,
          decimalsInFloat: 1,
          tooltip: {
            enabled: true,
          },
        },
      },
    };
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
        />
      </div>
    );
  }
}
export default ApexChart;
