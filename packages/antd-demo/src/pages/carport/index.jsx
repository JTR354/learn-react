import React, { useMemo, useReducer, useState, useEffect } from "react";
import { Button, Drawer, message } from "antd";
import "./styles.less";

import "antd/dist/antd.less";

let current = 1;
let timer;
let lock = false;
const Carport = () => {
  const [count, setCount] = useReducer((c) => c + 1, 0);
  const toggle = useMemo(() => {
    return count % 2 === 0;
  }, [count]);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (reset) {
      current = 1;
      lock = false;
      setReset(false);
    }
  }, [reset]);
  return (
    <div className="App">
      <Drawer
        title="确认房源信息"
        width={390}
        height={844 / 3}
        placement="bottom"
        visible={true}
      >
        <div className="wrapper">
          <div>
            <p>你将选择。。。。。</p>
            <p>总价。。。。。</p>
            <p>温馨提示</p>
            <p>点击 {count} 次</p>
          </div>
          <div className="button-wrapper">
            {toggle && <div className="heart" />}
            <Button
              onClick={() => {
                // if (isLock.current) return;
                console.log(current);
                if (current && current % 2 === 0) {
                  if (lock) return;
                  setLoading(true);
                  clearTimeout(timer);
                  lock = true;
                  timer = timeBack(10, () => {
                    setLoading(false);
                    setReset(true);
                  });
                } else {
                  setLoading(false);
                  current++;
                }
                setCount();

                function timeBack(time, cb) {
                  if (time === 0) {
                    cb && cb();
                    return "continue";
                  }
                  // console.warn(`倒计时${time}`);
                  const hide = message.loading(`倒计时${time}`);
                  setTimeout(() => {
                    time--;
                    hide();
                    return timeBack(time, cb);
                  }, 1000);
                }
              }}
              loading={loading}
              className="button"
              type="primary"
              size="large"
            >
              {toggle ? "立即选房" : "确认选房"}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Carport;
