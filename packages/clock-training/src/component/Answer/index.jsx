import "./styles.css";
import { useState } from "react";
import cn from "classnames";
export default ({ currentIndex, answers, result }) => {
  const [value, setValue] = useState(["", "", ""]);
  const handleChange = (index, e) => {
    const newValue = value.map((it, i) => {
      if (i === index) {
        return String(e.target.value);
      }
      return it;
    });
    setValue(newValue);
    answers.current[currentIndex] = newValue;
  };

  const disabled = Array.isArray(result);

  return (
    <div className={cn("answer", { error: result && !result[currentIndex] })}>
      <input
        type="tel"
        maxLength={2}
        value={value[0]}
        onChange={(e) => handleChange(0, e)}
        disabled={disabled}
      />
      时
      <input
        type="tel"
        maxLength={2}
        value={value[1]}
        onChange={(e) => handleChange(1, e)}
        disabled={disabled}
      />
      分
      <input
        type="tel"
        maxLength={2}
        value={value[2]}
        onChange={(e) => handleChange(2, e)}
        disabled={disabled}
      />
      秒
    </div>
  );
};
