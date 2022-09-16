import { useEffect, useRef, useLayoutEffect } from "react";
import "./styles.css";
import logo from "../../logo.svg";
const Header = () => {
  // console.log(Header.name, 'run')
  const ref = useRef();
  useEffect(() => {
    console.log("useEffect", ref.current);
  }, []);

  useLayoutEffect(() => {
    // 同步执行，https://juejin.cn/post/6959886436526981150
    console.log("useLayoutEffect", ref.current.getAttribute("class"));
  }, []);

  return (
    <header ref={ref} className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://github.com/jtr354"
        target="_blank"
        rel="noopener noreferrer"
      >
        TodoList
      </a>
    </header>
  );
};

export default Header;
