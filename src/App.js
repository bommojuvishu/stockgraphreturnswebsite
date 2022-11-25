import "./App.css";
import { useEffect, useState } from "react";
import { Input, Button, Spin, Tabs, InputNumber } from "antd";
import "antd/dist/antd.css";
import LineChart from "./components/LineChart";
import axios from "axios";
import Returns from "./components/Returns";

const baseURL = "https://7bsjtdr8bi.execute-api.ap-south-1.amazonaws.com/dev/";

function App() {
  const [closedata, setCloseData] = useState([]);
  const [stocknames, setStockNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [periodinput, setPeriodInput] = useState("365");
  const [namesarr, setNamesArr] = useState([]);
  // let namesarr = [];

  let i = 0;

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
        setLoading(false);
        setCloseData(response?.data.body);
        setStockNames(Object.keys(response?.data.body));
      });
  };

  return (
    <div className="App container">
      <div class="jumbotron">
        <h1>Stocks Returns</h1>
        <p>Returns Stock returns and graphs</p>
      </div>

      <Tabs>
        <Tabs.TabPane tab="Graph" key="item-1">
          <Input
            placeholder="Enter stock symbol like INFY"
            onChange={onInput}
            allowClear={true}
          />
          <div> </div>
          <InputNumber defaultValue={365} onChange={changeperiodinput} />

          <Button type="primary" onClick={reqGateway}>
            {" "}
            Submit
          </Button>
          <div>
            {" "}
            <Spin spinning={loading} size={"large"}></Spin>
          </div>
          {stocknames?.map((item, i) => {
            i = i + 1;
            const tmp = closedata[item];
            return <LineChart name={item} closedata={tmp} />;
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Returns" key="item-2">
          <Returns />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
