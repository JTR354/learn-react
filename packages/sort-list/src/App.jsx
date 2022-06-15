import { useRef } from "react";
import { useState } from "react";
import cn from "classnames";
import "./App.css";
import { useEffect } from "react";
import { arrayMoveImmutable } from "array-move";
const SortElement = (props) => {
  const { item, onDragging, index, active, onSwitch, onEnd } = props;
  const node = useRef();
  useEffect(() => {
    const currentNode = node.current;
    if (active == null) {
      currentNode.style.transform = "";
      return;
    }
    const [activeIndex, activeNode, originNode] = active;
    if (activeIndex !== index) {
      // node.current;
      currentNode.style.pointerEvents = "none";
      // const x = currentNode.offsetTop ÷

      // TODO: 排序动画
      /**
       * 当activeNode 5
       * 1. 向上走, active top < origin top, 那么 比active top 大的 node 都要 + 1， 否则 0
       * 2. 向下走 active top > origin top， 那么 比 active top 小的 node 都要 - 1. 否则 0
       */
      if (activeNode.offsetTop < originNode.offsetTop) {
        if (activeNode.offsetTop < currentNode.offsetTop) {
          currentNode.style.transform = `translate3d(0,${currentNode.offsetHeight}px, 0)`;
          // onSwitch(activeIndex, index);
        } else {
          currentNode.style.transform = "translate3d(0,0,0)";
        }
      } else {
        if (activeNode.offsetTop > currentNode.offsetTop) {
          currentNode.style.transform = `translate3d(0,-${currentNode.offsetHeight}px, 0)`;
          // onSwitch(activeIndex, index);
        } else {
          currentNode.style.transform = "translate3d(0,0,0)";
        }
      }
      currentNode.style.transition = "all 0.3s ease-out";
      if (
        Math.abs(activeNode.offsetTop - currentNode.offsetTop) <=
        currentNode.offsetHeight
      ) {
        onSwitch(activeIndex, index);
      }
      // const y =
      //   activeNode.offsetTop <=
      //   activeNode.offsetTop >= currentNode.offsetTop;
      //     currentNode.offsetTop + currentNode.offsetHeight &&
      // // const y = true;
      // const row = 1;
      // if (y) {
      //   let flag;
      //   if (
      //     activeNode.offsetTop + activeNode.offsetHeight <
      //     currentNode.offsetTop
      //   ) {
      //     flag = -1;
      //   } else if (
      //     activeNode.offsetTop <
      //     currentNode.offsetTop + currentNode.offsetHeight
      //   ) {
      //     flag = 1;
      //   } else {
      //     0;
      //   }
      //   currentNode.style.transform = `translate3d(0,${
      //     currentNode.offsetHeight * row * flag
      //   }px,0)`;
      // } else {
      //   // currentNode.style.transform = `translate3d(0,0,0)`;
      // }
    }
  }, [active]);
  return (
    <li
      className={cn("list-item")}
      ref={node}
      onMouseDown={(event) => {
        const currentNode = node.current;
        currentNode.style.opacity = 0;
        const cloneNode = currentNode.cloneNode(true);
        cloneNode.classList.add("dragging");
        cloneNode.style.height = currentNode.offsetHeight + "px";
        cloneNode.style.width = currentNode.offsetWidth + "px";
        cloneNode.style.left = currentNode.offsetLeft + "px";
        cloneNode.style.top = currentNode.offsetTop + "px";
        cloneNode.addEventListener("mousemove", (e) => {
          const x = e.clientX - event.clientX + currentNode.offsetLeft;
          const y = e.clientY - event.clientY + currentNode.offsetTop;
          cloneNode.style.top = y + "px";
          cloneNode.style.left = x + "px";
          onDragging(index, cloneNode, currentNode);
        });
        cloneNode.addEventListener("mouseup", (e) => {
          // console.log(e);
          document.body.removeChild(cloneNode);
          currentNode.style.opacity = 1;
          // currentNode.style.transform = "";
          onEnd();
        });
        document.body.append(cloneNode);
      }}
    >
      <span>{item}</span>
    </li>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState(
    new Array(10).fill(1).map((_, i) => `item-${i + 1}`)
  );
  const [active, setActive] = useState();
  const record = useRef([]);
  return (
    <div className="App">
      <ul>
        {list.map((item, index) => {
          return (
            <SortElement
              key={item}
              index={index}
              item={item}
              active={active}
              onDragging={(...args) => {
                setActive(args);
              }}
              onSwitch={(oldIndex, newIndex) => {
                // console.log(oldIndex, newIndex);
                record.current = { oldIndex, newIndex };
              }}
              onEnd={() => {
                console.log(record);
                const { oldIndex, newIndex } = record.current;
                setList(arrayMoveImmutable(list, oldIndex, newIndex));
                setActive(null);
              }}
            ></SortElement>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
