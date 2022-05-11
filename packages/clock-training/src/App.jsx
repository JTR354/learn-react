import { useReducer, useRef, useState, useEffect } from "react";

import "./App.css";

import Title from "./component/Title";
import Clocks from "./component/Clocks";

function App() {
  const [clocks, dispatch] = useReducer(
    () =>
      new Array(5).fill(1).map((it) => {
        return createRandomTime();
      }),
    []
  );

  const [result, setResult] = useState();

  const [right, setRight] = useState(0);

  const answers = useRef([]);

  useEffect(() => {
    if (Array.isArray(result)) {
      const current = result.filter((v) => v).length;
      if (current >= 5) {
        alert("恭喜你完成今天任务!!!!");
      }
      setRight((v) => v + current);
    }
  }, [result]);

  return (
    <div>
      <Title
        onNext={() => {
          dispatch();
          setResult();
          answers.current = [];
        }}
        right={right}
        onCheckIn={() => {
          const next = window.confirm("确定交卷吗?");
          next && setResult(check(answers, clocks));
        }}
      />
      <Clocks clocks={clocks} answers={answers} result={result} />
    </div>
  );
}

export default App;

function createRandomTime() {
  const h = String((Math.random() * 12) >> 0);
  const m = String((Math.random() * 60) >> 0);
  const s = String((Math.random() * 60) >> 0);
  return [h.padStart(2, "0"), m.padStart(2, "0"), s.padStart(2, "0")].join(":");
}

function check(answers, clocks) {
  const result = [];
  const ans = answers.current.map((it) =>
    it.map((c) => c.padStart(2, "0")).join(":")
  );
  clocks.forEach((it, i) => {
    if (it === ans[i]) {
      result[i] = 1;
    }
  });
  return result;
}
