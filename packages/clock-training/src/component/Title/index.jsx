import { useState } from "react";
import "./styles.css";

export default (props) => {
  const { onNext, onCheckIn, right } = props;
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>
        <span
          onClick={() => {
            const next = window.confirm(
              count ? "确定进入下一题?" : "准备好了吗? 家弘?"
            );
            if (next) {
              setCount(count + 1);
              onNext();
            }
          }}
        >
          {!count ? "开始" : "下一题"}
        </span>
        {!!count && (
          <button className="check-in" onClick={onCheckIn}>
            交卷
          </button>
        )}
      </h1>
      {!!count ? (
        <h2>
          第{count}题 【 {right}/{count * 5} 】
        </h2>
      ) : null}
    </>
  );
};
