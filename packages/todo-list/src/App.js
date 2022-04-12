import "./App.css";
import Header from "./components/header";
import List from "./components/list";
import Control from "./components/control";
import { useRef } from "react";

function App() {
  const ref = useRef({})
  
  return (
    <div className="App">
      <Header />
      <List
        handler={ref}
      />
      <Control
        handler={ref}
      />
    </div>
  );
}

export default App;


