import "./styles.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import Answer from "../Answer";

export default ({ clocks, answers, result }) => {
  return (
    <section className="clockWrapper">
      {clocks.map((value, index) => (
        <div key={value}>
          <Clock
            minuteMarksLength={5}
            minuteHandLength={90}
            hourHandLength={60}
            size={250}
            value={value}
            renderNumbers={true}
          />
          {result && <p>{value}</p>}
          <Answer answers={answers} currentIndex={index} result={result} />
        </div>
      ))}
    </section>
  );
};
