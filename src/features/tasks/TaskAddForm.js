import React, { useState } from "react";
import css from "../../assets/Tasks.module.scss";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Add } from "../../components/icons/icons";
import { useRef } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "./taskSlice";
const TaskAddForm = ({ showAddTaskFrom }) => {
  const auth = useAuth();
  const { id } = useParams();
  const [value, setvalue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const addNewTask = () => {
    if (value.trim().length === 0) return showAddTaskFrom(false);
    const payload = {
      body: {
        id,
        task: value.trim(),
      },
      auth,
    };
    dispatch(addTask(payload));
    showAddTaskFrom(false);
  };
  return (
    <>
      <div className={css.mask}></div>
      <div className={css.addTask}>
        <Input
          onChange={(e) => setvalue(e.target.value)}
          classname={css.newTaskInput}
          placeholder="new Task"
          ref={inputRef}
        />
        <Button
          classname={css.newTaskBtn}
          className={`${value.length > 0 && css.valid} ${
            value.length === 0 && css.notvalid
          }`}
          onClick={addNewTask}
        >
          <Add />
        </Button>
      </div>
    </>
  );
};

export default TaskAddForm;
