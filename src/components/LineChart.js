import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const name = props?.name;
  const closedata = props?.closedata;

  const labels = Array.from(Array(closedata?.length).keys());

  const data = {
    labels: labels,
    datasets: [
      {
        label: name,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: closedata,
        borderWidth: "1",
        pointRadius: "0",
      },
    ],
  };
  return (
    <div style={{ width: "500px", margin: "auto" }}>
      {props?.closedata ? <Line data={data} /> : "nodata"}
    </div>
  );
};

export default LineChart;
