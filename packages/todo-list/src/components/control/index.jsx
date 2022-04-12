import { useReducer, useState } from "react";

const Add = (props) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="add-wrapper">
      {toggle && (
        <input
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <button
        className="button"
        onClick={() => {
          setToggle(true);
          if (props.onInsert(value)) {
            setToggle(false);
            setValue("");
          }
        }}
      >
        {toggle ? "确定" : "增加"}
      </button>
    </div>
  );
};

export default Add;
