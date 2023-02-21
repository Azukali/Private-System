import { useState, useEffect } from "react";
import IndexRouter from "./route/indexRouter";
import reactLogo from "./assets/react.svg";
import "./App.css";
import 'antd/dist/reset.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <IndexRouter></IndexRouter>
    </div>
  );
}

export default App;
  