import Chart from "react-apexcharts";
import React from "react";

class ApexChart extends React.Component {
  render() {
    let data_entry = this.props.stocksdata.map((item) => {
      let tmp = {};
      tmp = {
        x: Date.parse(item["Date"]),
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
          type: "datetime",
        },
        yaxis: {
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
