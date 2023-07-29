import React from "react";
import Task from "./Task";
import css from "../../assets/Tasks.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllTask, selectAlltaskByListId } from "./taskSlice";

const Tasks = () => {
  const { id, filter } = useParams();
  console.log(filter);
  const tasks = useSelector((state) =>
    selectAlltaskByListId(state, id, filter)
  );
  return (
    <div className={css.tasks}>
      <Task tasks={tasks} />
    </div>
  );
};

export default Tasks;
