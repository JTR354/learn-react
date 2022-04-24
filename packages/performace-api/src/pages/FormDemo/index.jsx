import { useContext } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import { useState, memo, useRef } from "react";
import React from "react";

// const FormContext = createContext();
// const SetFormContext = createContext();

const FieldContext = createContext();
const FieldUpdateContext = createContext();

const Form = ({ children, initialValues, form: formRef }) => {
  const [form, setForm] = useState(initialValues);
  formRef.current = form;
  // return (
  //   <SetFormContext.Provider value={setForm}>
  //     <FormContext.Provider value={form}>
  //       {/* <Middle>{children}</Middle> */}
  //       {children}
  //     </FormContext.Provider>
  //   </SetFormContext.Provider>
  // );
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { form, setForm });
    }
    console.log(child);
    return child;
  });
};

// const Middle = memo(({ children }) => {
//   console.log("m render");
//   return children;
// });

function useForm() {
  return useRef();
}

const FormDemo = () => {
  const form = useForm();
  return (
    <div>
      <h1>Form Demo</h1>
      <Form form={form} initialValues={{}}>
        <Field name="userId">
          <Input></Input>
        </Field>
        <Field name="password">
          <Input></Input>
        </Field>
        <Field>
          <button
            onClick={() => {
              console.log(form);
            }}
          >
            submit
          </button>
        </Field>
      </Form>
    </div>
  );
};

const Input = () => {
  const value = useContext(FieldContext);
  const updateForm = useContext(FieldUpdateContext);
  console.log("input render", { value });
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          updateForm(e.target.value);
        }}
      />
    </div>
  );
};

const Field = memo(
  (props) => {
    const { name, children, form, setForm } = props;
    console.log("field render", name);
    // const form = useContext(FormContext);
    // const setForm = useContext(SetFormContext);
    const updateForm = useCallback((value) => {
      setForm((prev) => {
        return { ...prev, [name]: value };
      });
    }, []);
    return (
      <FieldUpdateContext.Provider value={updateForm}>
        <FieldContext.Provider value={form[name] || ""}>
          {children}
        </FieldContext.Provider>
      </FieldUpdateContext.Provider>
    );
  },
  function (prev, next) {
    const { name, form: prevForm } = prev;
    const { form: nextForm } = next;
    if (!name) return true;
    return prevForm[name] === nextForm[name];
  }
);
export default FormDemo;
