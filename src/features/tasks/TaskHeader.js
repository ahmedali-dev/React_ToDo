import React from "react";
import { Add, Close } from "../../components/icons/icons";
import css from "../../assets/Tasks.module.scss";
import { NavLink, useParams } from "react-router-dom";

const TaskHeader = ({ addTask }) => {
  const { id } = useParams();
  const baseUrl = `/lists/${id}/`;
  const activeClass = ({ isActive }) => {
    return isActive ? css.header_filter_linkActive : "";
  };
  return (
    <div className={css.header}>
      <div className={css.header_name}>
        <h2>list Name</h2>
        <div
          onClick={() => {
            if (addTask.addTask) return addTask.setAddTask(false);
            addTask.setAddTask(true);
          }}
          className={addTask.addTask ? css.header_name_AddActive : ""}
        >
          {addTask.addTask ? <Close /> : <Add />}
        </div>
      </div>
      <div className={css.header_filter}>
        <NavLink to={`${baseUrl}all`} className={activeClass}>
          All
        </NavLink>
        <NavLink to={`${baseUrl}start`} className={activeClass}>
          Start
        </NavLink>
        <NavLink to={`${baseUrl}finish`} className={activeClass}>
          Finish
        </NavLink>
      </div>
    </div>
  );
};

export default TaskHeader;
