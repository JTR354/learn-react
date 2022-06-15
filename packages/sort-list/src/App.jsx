import { useRef } from "react";
import { useState } from "react";
import cn from "classnames";
import "./App.css";
import { useEffect } from "react";

const SortElement = (props) => {
  const { item, onDragging, index, active } = props;
  const node = useRef();
  useEffect(() => {
    if (active == null) return;
    const [activeIndex, activeNode] = active;
    if (activeIndex !== index) {
      // node.current;
      const currentNode = node.current;
      currentNode.style.pointerEvents = "none";
      // const x = currentNode.offsetTop ÷
      if (index == 8) {
        console.log(
          activeNode.offsetTop,
          currentNode.offsetHeight,
          currentNode.offsetTop
        );
      }
      // TODO: 排序动画
      const y =
        activeNode.offsetTop <=
          currentNode.offsetTop + currentNode.offsetHeight &&
        activeNode.offsetTop >= currentNode.offsetTop;
      // const y = true;
      const flag =
        activeNode.offsetTop < currentNode.offsetTop + currentNode.offsetHeight
          ? 1
          : 0;
      const row = 1;
      if (y) {
        currentNode.style.transform = `translate3d(0,${
          currentNode.offsetHeight * row * flag
        }px,0)`;
        currentNode.style.transition = "all 0.3s ease-out";
      } else {
        // currentNode.style.transform = `translate3d(0,0,0)`;
      }
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
          onDragging(index, cloneNode);
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
            ></SortElement>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
