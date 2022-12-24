import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
} from "victory";

class Candlestick extends React.Component {
  render() {
    let data = this.props?.stocksdata;
    let periodinput = this.props?.periodinput;
    data = data?.map((item) => {
      item["x"] = Date.parse(item["Date"]);
      return item;
    });
    return data && Object.keys(data).length > 0 ? (
      <VictoryChart
        height={periodinput * 2.75}
        width={periodinput * 5}
        theme={VictoryTheme.material}
        scale={{ x: "time", y: "log" }}
        domainPadding={{ x: 25 }}
      >
        <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{ positive: "#6CC04A", negative: "#c43a31" }}
          data={data}
        />
      </VictoryChart>
    ) : (
      <span> {"NO DATA"}</span>
    );
  }
}

export default Candlestick;
