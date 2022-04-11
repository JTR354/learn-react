import { Suspense, useEffect, useState, Component } from "react";
import Spinner from "./Spinner";

const NO_RESULT = {};
let i = 0;
const getName = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i % 2 === 0 ? "Leo" : "Jtr");
      i++;
    }, 1000);
  });
};

const getInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i % 2 === 0 ? "LeoInfo" : "JtrInfo");
      i++;
    }, 1500);
  });
};

const fetchGetName = createFetcher(getName);
const Root = () => {
  return (
    <div>
      <h1>Root</h1>
      <Suspense fallback={<Spinner />}>
        <UserName />
      </Suspense>
    </div>
  );
};

function UserName() {
  const [name, setName] = useState(fetchGetName);
  const [info, setInfo] = useState("info");
  console.log(UserName.name, "run.....");
  useEffect(() => {
    console.warn(UserName.name, "init");
  }, []);
  return (
    <p>
      name:{name}
      info: {info}
      <HappyPathSuspense>
        <button
          onClick={async () => {
            setName(createFetcher(getName));
            setInfo(createFetcher(getInfo));
          }}
        >
          relay
        </button>
      </HappyPathSuspense>
    </p>
  );
}

function createFetcher(task) {
  let result = NO_RESULT;
  return () => {
    const p = task();
    p.then((r) => {
      result = r;
    }).catch((e) => {
      result = e;
    });
    if (result === NO_RESULT) {
      throw p;
    }
    return result;
  };
}

class HappyPathSuspense extends Component {
  state = {
    pending: false,
  };
  componentDidCatch(err) {
    if (typeof err.then === "function") {
      this.setState({ pending: true });
      err.then((r) => {
        this.setState({ pending: false });
      });
    }
  }
  render() {
    return this.state.pending
      ? this.props.fallback || null
      : this.props.children;
  }
}
export default Root;

/**
 * Suspense 用于React的异步渲染逻辑
 * 可以将api请求组件包裹在Suspense里面;注意每次都要创建新的实例才行,否则状态已经被改变就不会throw promise
 * 当然 lazy 用于加载异步组件,也是理所当然.
 */
