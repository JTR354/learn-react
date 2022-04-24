import { useReducer } from "react";
import { useContext } from "react";
import { useState, createContext, memo } from "react";

const JobsContext = createContext();
const SetJobsContext = createContext();

const TitleContext = createContext({ title: "123" });

const tools = new Map();

tools.set("onCreate", (state, action) => {
  const { data } = action;
  return state.concat({
    text: data,
    id: Math.random().toString(36).slice(2),
    checked: false,
  });
});

tools.set("onDel", (state, action) => {
  const { data } = action;
  return state.filter((child) => child.id !== data.id);
});

tools.set("onFinished", (state, action) => {
  const { data } = action;
  return state.map((job) => {
    if (job.id === data.id) {
      return { ...job, checked: !job.checked };
    }
    return job;
  });
});

function todoReducer(state, action) {
  const handler = tools.get(action.type);
  const result = (handler && handler(state, action)) || state;
  return result;
  // switch (type) {
  //   case "onCreate":
  //     return state.concat({
  //       text: data,
  //       id: Math.random().toString(36).slice(2),
  //       checked: false,
  //     });
  //   case "onDel":
  //     return state.filter((child) => child.id !== data.id);
  //   case "onFinished":
  //     return state.map((job) => {
  //       if (job.id === data.id) {
  //         return { ...job, checked: !job.checked };
  //       }
  //       return job;
  //     });
  //   default:
  //     return state;
  // }
}

function TodoList() {
  const [jobs, dispatch] = useReducer(todoReducer, []);
  // const [jobs, setJobs] = useState([]);
  // const onCreate = useCallback((value) => {
  //   setJobs((arr) => {
  //     return arr.concat({
  //       text: value,
  //       id: Math.random().toString(36).slice(2),
  //       checked: false,
  //     });
  //   });
  // }, []);
  // const onDel = (it) => {
  //   setJobs((arr) => {
  //     return arr.filter((child) => child.id !== it.id);
  //   });
  // };
  // const onFinished = (it) => {
  //   setJobs((arr) => {
  //     return arr.map((job) => {
  //       if (job.id === it.id) {
  //         return { ...job, checked: !job.checked };
  //       }
  //       return job;
  //     });
  //   });
  // };
  // const dispatch = useRef({ onCreate, onDel, onFinished }).current;

  const [title] = useState("todoList");

  return (
    <div>
      <TitleContext.Provider value={title}>
        <JobsContext.Provider value={jobs}>
          <SetJobsContext.Provider value={dispatch}>
            <Middle />
          </SetJobsContext.Provider>
        </JobsContext.Provider>
      </TitleContext.Provider>
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
  const title = useContext(TitleContext);
  return <h1>{title}</h1>;
});

function List() {
  const dispatch = useContext(SetJobsContext);
  const jobs = useContext(JobsContext);
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
                // onFinished(it);
                dispatch({ type: "onFinished", data: it });
              }}
            />
            {it.text}{" "}
            <button
              onClick={(e) => {
                // onDel(it);
                dispatch({ type: "onDel", data: it });
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
  const dispatch = useContext(SetJobsContext);

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
                // setValue("");
                dispatch({ type: "onCreate", data: value });
                // onCreate(value);
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
