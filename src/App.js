import "./App.css";
import { useEffect, useState}  from "react";
import { Input, Button , Spin} from "antd";
import "antd/dist/antd.css";
import LineChart from "./components/LineChart";
import axios from "axios";



const baseURL = "https://7bsjtdr8bi.execute-api.ap-south-1.amazonaws.com/dev/";


function App() {
  const  [closedata , setCloseData] = useState([])
  const [stocknames ,setStockNames] =  useState([])
  const [loading, setLoading] = useState(false);
  let namesarr=[] 
  let  i = 0

  const onInput = (e) => {
    console.log(e.target.value);
    const entered = e.target.value
    namesarr = entered.split(",")
    namesarr = namesarr.map((item => item.trim()))
   
  };

  const reqGateway = () => {
    setLoading(true)
    axios
    .post(baseURL, {
      "name":namesarr
    })
    .then((response) => {
      setLoading(false)
     setCloseData(response?.data.body)
     setStockNames( Object.keys(response?.data.body))

    });
    
  };

  return (
    <div className="App container">
      <div class="jumbotron">
        <h1>Stocks Returns</h1>
        <p></p>
      </div>
      <Input placeholder="Enter stock symbol like INFY" onChange={onInput} allowClear={true}  />
      <Button type="primary" onClick={reqGateway}> Submit</Button>
      <div> <Spin spinning={loading} size={"large"}></Spin></div>
     
      { stocknames?.map((item , i ) => {
        i = i +1
        const tmp = closedata[item]
        return <LineChart name ={item} closedata ={tmp} />
      }) }

      
    </div>
  );
      
}

export default App;
