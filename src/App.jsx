import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Child from "./Child";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(
        "/ajax/movieOnInfoList?token=&optimus_uuid=57DF5F50B0FB11ED9F89870ADBAB3E72485DB3091B1541578D84B94E24964396&optimus_risk_level=71&optimus_code=10"
      )
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        <li>11</li>
        <li>22</li>
        <li>33</li>
      </ul>
      <Child />
    </div>
  );
}

export default App;
