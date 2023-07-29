import React, { useState } from "react";
import TaskHeader from "./TaskHeader";
import TaskAddForm from "./TaskAddForm";
import TaskItem from "./TaskItem";
const Task = ({ tasks }) => {
  // tasks = [];
  const [addTask, setAddTask] = useState(false);
  return (
    <>
      <TaskHeader addTask={{ addTask, setAddTask }} />
      <TaskItem tasks={tasks} />
      {addTask && <TaskAddForm showAddTaskFrom={setAddTask} />}
    </>
  );
};

export default Task;
