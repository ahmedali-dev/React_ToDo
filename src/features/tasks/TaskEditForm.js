import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Mark } from "../../components/icons/icons";
import css from "../../assets/Tasks.module.scss";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "./taskSlice";

const TaskEditForm = (props) => {
  const auth = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value);
  const inputref = useRef(null);

  useEffect(() => {
    inputref.current?.focus();
  }, []);

  const editHandle = () => {
    if (props.id.trim().length === 0 || !id) {
      toast.error("error happens");
      return props.setEditId(null);
    }

    if (props.value.trim() === value) return props.setEditId(null);

    const payload = {
      body: {
        id,
        taskId: props.id,
        task: value,
      },
      auth,
    };

    dispatch(updateTask(payload));

    props.setEditId(null);
  };
  return (
    <div className={css.TaskEditForm}>
      <Input
        ref={inputref}
        onChange={(e) => setValue(e.target.value)}
        classname={css.inputEdit}
        defaultValue={props.value}
      />
      <Button
        className={`${value !== props.value && css.valid} ${
          value === props.value && css.notvalid
        }`}
        classname={`${css.btnEdit} `}
        onClick={editHandle}
      >
        <Mark />
      </Button>
    </div>
  );
};

export default TaskEditForm;
