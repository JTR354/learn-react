import { useReducer, useState } from "react";

import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./App.css";

function App() {
  const [clocks, dispatch] = useReducer(
    () =>
      new Array(5).fill(1).map((it) => {
        return createRandomTime();
      }),
    []
  );
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>
        <span
          onClick={() => {
            const next = window.confirm(
              count ? "确定进入下一题?" : "准备好了吗? 家弘?"
            );
            if (next) {
              setCount(count + 1);
              dispatch();
              setShow(false);
            }
          }}
        >
          {!count ? "开始" : "下一题"}
        </span>
        {!!count && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
          >
            {!show ? "查看答案" : "隐藏答案"}
          </button>
        )}
      </h1>
      {!!count ? <h2>第{count}题</h2> : null}
      <section className="clockWrapper">
        {clocks.map((value) => (
          <div>
            <Clock key={value} value={value} />
            {show && <p>{value}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}

function createRandomTime() {
  const h = String((Math.random() * 24) >> 0);
  const m = String((Math.random() * 60) >> 0);
  const s = String((Math.random() * 60) >> 0);
  return [h.padStart(2, "0"), m.padStart(2, "0"), s.padStart(2, "0")].join(":");
}

export default App;
