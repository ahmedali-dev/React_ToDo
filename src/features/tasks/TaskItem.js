import React, { useState } from "react";
import CateWriteImage from "../../components/icons/cateWrite.png";
import TaskCheckBox from "./TaskCheckBox";
import { Delete, Edit } from "../../components/icons/icons";
import css from "../../assets/Tasks.module.scss";
import TaskEditForm from "./TaskEditForm";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { deleteTask } from "./taskSlice";
const TaskItem = ({ tasks }) => {
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const auth = useAuth();
  const { id } = useParams();
  const deleteHandle = (taskId) => {
    if (!taskId || !id) return toast.error("can not removed");
    const payload = {
      body: {
        id,
        taskId,
      },
      auth,
    };
    dispatch(deleteTask(payload));
  };
  return (
    <>
      {tasks ? (
        tasks?.length > 0 ? (
          tasks?.map((task) => {
            if (task._id !== edit) {
              return (
                <div
                  key={task._id}
                  className={`${css.task} ${task.status && css.task_active}`}
                >
                  <div className={css.content}>
                    <TaskCheckBox id={task._id} status={task.status} />
                    <h4>{task.task}</h4>
                  </div>

                  <div className={css.task_options}>
                    <div onClick={() => setEdit(task._id)}>
                      <Edit />
                    </div>
                    <div onClick={deleteHandle.bind(null, task._id)}>
                      <Delete />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <TaskEditForm
                key={task._id}
                id={edit}
                value={task.task}
                setEditId={setEdit}
              />
            );
          })
        ) : (
          <div>
            <img src={CateWriteImage} alt={"image for not found task"} />
          </div>
        )
      ) : (
        <div>
          <img src={CateWriteImage} alt={"image for not found task"} />
        </div>
      )}
    </>
  );
};

export default TaskItem;
