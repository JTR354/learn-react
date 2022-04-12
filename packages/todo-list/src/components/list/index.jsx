import { useLayoutEffect, useState, useEffect } from "react";

const List = ({ handler }) => {
  console.log('...run', List.name )

  const [data, setData] = useState(initData);
  useCacheData(data);

  useLayoutEffect(() => {
    handler.current.onInsert = (val) => {
      console.log("insert");
      if (val) {
        setData((r) => r.concat(createItemData(val)));
      }
      return val;
    };
  }, []);
  return (
    <ul>
      {data.map((it) => (
        <li key={it.id}>
          <label style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <input
                type="checkbox"
                defaultChecked={it.checked}
                onClick={() => {
                  toggle(setData, it.id);
                }}
              />
              {it.val}
            </div>

            <button
              style={{ alignContent: "flex-end" }}
              onClick={(e) => {
                e.stopPropagation();
                setData((r) => r.filter((item) => it.id !== item.id));
              }}
            >
              删除
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default List;

function createItemData(val) {
  return {
    id: String(Math.random()).slice(-6),
    val,
    checked: false,
  };
}

function initData() {
  return JSON.parse(localStorage.getItem("data")) || [];
}

function useCacheData(data) {
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
}

function toggle(update, id) {
  update((r) =>
    r.map((it) => {
      if (it.id === id) {
        it = { ...it, checked: !it.checked };
      }
      return it;
    })
  );
}
