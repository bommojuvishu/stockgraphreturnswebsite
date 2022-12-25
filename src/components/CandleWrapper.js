import { React, useState } from "react";
import Candlestick from "./Candlestick";
import ApexChart from "./ApexChart";
import { Input, Button, Spin, InputNumber } from "antd";
import axios from "axios";

const baseURL =
  "https://7bsjtdr8bi.execute-api.ap-south-1.amazonaws.com/dev/candlestick";

function CandleWrapper() {
  const [responseui, setResponseUI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [namesarr, setNamesArr] = useState([]);

  const [periodinput, setPeriodInput] = useState("90");

  const onInput = (e) => {
    console.log(e.target.value);
    const entered = e.target.value;
    let namesarrtmp = entered.split(",");
    namesarrtmp = namesarrtmp.map((item) => item.trim());
    setNamesArr(namesarrtmp);
  };
  const changeperiodinput = (e) => {
    setPeriodInput(e);
  };

  const reqGateway = () => {
    setLoading(true);
    axios
      .post(baseURL, {
        name: namesarr,
        periodinput: periodinput,
      })
      .then((response) => {
        setResponseUI(response.data.body);
        setLoading(false);
        var arr = Object.values(response?.data.body);
      });
  };
  return (
    <div>
      <Input
        placeholder="Enter stock symbol like INFY"
        onChange={onInput}
        allowClear={true}
      />
      <InputNumber defaultValue={90} onChange={changeperiodinput} />
      <Button type="primary" onClick={reqGateway}>
        {" "}
        Submit
      </Button>
      <Spin spinning={loading} size={"large"}></Spin>
      {Object.keys(responseui)?.map((item) => {
        console.log("MAPS stocks:", item);

        return (
          <span>
            <h2>{item}</h2>
            <ApexChart
              stocksdata={responseui[item]}
              periodinput={periodinput}
            />
          </span>
        );
      })}
    </div>
  );
}

export default CandleWrapper;
