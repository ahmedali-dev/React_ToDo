import React from "react";
import { InputBefore } from "../../components/UI/Input";
import css from "../../assets/Tasks.module.scss";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { toggleTask } from "./taskSlice";
const TaskCheckBox = ({ id, status }) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { id: listId } = useParams();
  const toggleStatusHandle = () => {
    console.log(listId);
    console.log(id);
    console.log(
      "🚀 ~ file: TaskCheckBox.js:15 ~ toggleStatusHandle ~ !id || !listId:",
      !id || !listId
    );
    if (!id || !listId) return toast.error("error Happens!");

    const payload = {
      auth,
      taskId: id,
      body: { id: listId },
    };
    dispatch(toggleTask(payload));
  };
  return (
    <InputBefore
      id={id}
      defaultChecked={status}
      type="checkbox"
      classname={css.TaskCheckBox}
      onClick={toggleStatusHandle}
      label={
        <>
          <span></span>
          <span></span>
        </>
      }
      //   onClick={editstatus}
    />
  );
};

export default TaskCheckBox;
