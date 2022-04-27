import { createElement, useEffect, useMemo } from "react";
import { cloneElement, memo, useState } from "react";
let t = 0;
const WhichProps = () => {
  console.log("root render");
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("init----");
    setInterval(() => {
      t++;
      console.log(t);
    }, 500);
  }, []);
  return (
    <>
      <button
        onClick={() => {
          // Middle变化的是因为 父级的state的发生改变, 会造成middle的props.children变化
          setCount(count + 1);
        }}
      >
        run
      </button>
      <h1>which is props?</h1>
      <Child t={t} setCount={setCount} />
      {/* <Middle><Child /></Middle> */}
    </>
  );
};

const Middle = memo(
  (props) => {
    console.log("middle render", props);
    const [count, setCount] = useState(0);

    const { children } = props;
    const aaa = useMemo(() => {
      return {
        hi: {
          a: 123,
          b: [123123, 123, 1231],
          [Symbol("key")]: Symbol("Value"),
        },
      };
    }, []);
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>run{count}</button>
        {/* {children} */}
        {/* {cloneElement(children, aaa)} */}
        {/* <Child  /> */}
        {createElement(Child, aaa)}
      </div>
    );
  },
  function (prev, next) {
    console.log(prev, next, "middle memo");
    return true;
  }
);

const Child = memo((props) => {
  console.log("child render");
  return <div>this is a child{props.t}</div>;
});
// function (prev, next) {
//   console.log(prev, next, "child memo", prev === next);
// }

export default WhichProps;

/**
 * 1. state props context
 * 2. props, context 变化只会来自state
 * 3. state 变化 => props context 一定会变化
 * 4. props会传染 引发所有子组件的变化
 *
 *
 *
 *
 */
