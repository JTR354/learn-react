import "./App.css";
import Header from "./components/header";
import List from "./components/list";
import Control from "./components/control";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(initData);
  useCacheData(data);
  return (
    <div className="App">
      <Header />
      <List
        data={data}
        onSelect={({ id }) => {
          toggle(setData, id);
        }}
        onDel={({ id }) => {
          setData((r) => r.filter((it) => id !== it.id));
        }}
      />
      <Control
        onInsert={(val) => {
          if (val) {
            setData((r) => r.concat(createItemData(val)));
          }
          return val;
        }}
      />
    </div>
  );
}

export default App;

function createItemData(val) {
  return {
    id: String(Math.random()).slice(-6),
    val,
    checked: false,
  };
}

function initData() {
  return JSON.parse(localStorage.getItem("data")) || [];
}

function useCacheData(data) {
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
}

function toggle(update, id) {
  update((r) =>
    r.map((it) => {
      if (it.id === id) {
        it = { ...it, checked: !it.checked };
      }
      return it;
    })
  );
}
