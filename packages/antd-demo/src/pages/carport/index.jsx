import React, { useMemo, useReducer, useState } from "react";
import { Button, Drawer } from "antd";
import "./styles.less";

import "antd/dist/antd.less";
const Carport = () => {
  const [count, setCount] = useReducer((c) => c + 1, 0);
  const toggle = useMemo(() => {
    return count % 2 === 0;
  }, [count]);
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
              onClick={setCount}
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
