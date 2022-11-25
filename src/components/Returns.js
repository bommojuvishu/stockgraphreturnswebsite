import { React, useState } from "react";
import { Input, Button, Spin, DatePicker } from "antd";
import axios from "axios";

const baseURL =
  "https://7bsjtdr8bi.execute-api.ap-south-1.amazonaws.com/dev/returns/";

const Returns = () => {
  const [responseui, setResponseUI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [namesarr, setNamesArr] = useState([]);
  const [sumofrtr, setSumRtr] = useState("");

  let i = 0;

  const onInput = (e) => {
    console.log(e.target.value);
    const entered = e.target.value;
    let namesarrtmp = entered.split(",");
    namesarrtmp = namesarrtmp.map((item) => item.trim());
    setNamesArr(namesarrtmp);
  };

  const startdatechange = (date, dateString) => {
    setStartDate(dateString);
    return {};
  };

  const enddatechange = (date, dateString) => {
    setEndDate(dateString);
    return {};
  };
  const reqGateway = () => {
    setLoading(true);
    axios
      .post(baseURL, {
        name: namesarr,
        startdate: startdate,
        enddate: enddate,
      })
      .then((response) => {
        setResponseUI(response.data.body);
        setLoading(false);
        var arr = Object.values(response?.data.body);
        var sum = 0;
        // Running the for loop
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        setSumRtr(sum);

        // setStockNames(Object.keys(response?.data.body));
      });
  };

  return (
    <div>
      <Input
        placeholder="Enter stock symbol like INFY"
        onChange={onInput}
        allowClear={true}
      />

      <div>
        Start Date
        <DatePicker onChange={startdatechange} />
        End Date
        <DatePicker onChange={enddatechange} />
      </div>
      <Button type="primary" onClick={reqGateway}>
        {" "}
        Submit
      </Button>
      <div>
        {" "}
        <Spin spinning={loading} size={"large"}></Spin>
      </div>
      <div>
        <h2> SUM : {sumofrtr}</h2>
        <pre>{JSON.stringify(responseui, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Returns;
