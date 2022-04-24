import { useMemo } from "react";
import { useContext } from "react";
import { useState, useCallback, createContext, useRef, memo } from "react";

const JobsContext = createContext();
const SetJobsContext = createContext();
function TodoList() {
  const [jobs, setJobs] = useState([]);
  const onCreate = useCallback((value) => {
    setJobs((arr) => {
      return arr.concat({
        text: value,
        id: Math.random().toString(36).slice(2),
        checked: false,
      });
    });
  }, []);
  const onDel = (it) => {
    setJobs((arr) => {
      return arr.filter((child) => child.id !== it.id);
    });
  };
  const onFinished = (it) => {
    setJobs((arr) => {
      return arr.map((job) => {
        if (job.id === it.id) {
          return { ...job, checked: !job.checked };
        }
        return job;
      });
    });
  };
  const setFn = useRef({ onCreate, onDel, onFinished }).current;

  const title = useMemo(() => {
    return `todo list`;
  });

  return (
    <div>
      <JobsContext.Provider value={{ jobs, title }}>
        <SetJobsContext.Provider value={setFn}>
          <Middle />
        </SetJobsContext.Provider>
      </JobsContext.Provider>
    </div>
  );
}

const Middle = memo(() => {
  return (
    <>
      <Header />
      <Create />
      <List />
    </>
  );
});

// function Header() {
//   console.log("header render");
//   const { title } = useContext(JobsContext);
//   return <h1>{title}</h1>;
// }
const Header = memo(() => {
  console.log("header render");
  const { title } = useContext(JobsContext);
  return <h1>{title}</h1>;
});

function List() {
  const { onDel, onFinished } = useContext(SetJobsContext);
  const { jobs } = useContext(JobsContext);
  console.log("list render");
  return (
    <ul>
      {jobs.map((it) => {
        return (
          <li key={it.id}>
            <input
              type="checkbox"
              defaultChecked={it.checked}
              onChange={() => {
                onFinished(it);
              }}
            />
            {it.text}{" "}
            <button
              onClick={(e) => {
                onDel(it);
              }}
            >
              del
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Create() {
  console.log("create render");
  const { onCreate } = useContext(SetJobsContext);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      {show ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (value) {
                setValue("");
                onCreate(value);
              }
            }}
          >
            create
          </button>
        </>
      ) : (
        <button onClick={() => setShow(true)}>add</button>
      )}
    </div>
  );
}

export default TodoList;
