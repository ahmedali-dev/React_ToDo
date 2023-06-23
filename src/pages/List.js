import React, { useEffect, useContext } from "react";
import List_Side from "./../components/list/List-side";
import List_Item from "./../components/list/List-item";
import { useParams } from "react-router-dom";
import css from "./assets/Lists.module.scss";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../Store/Auth-context";
import { getLists } from "../Store/slices/ListSlice";
import { toast } from "react-hot-toast";
import { AddTask } from "../Store/slices/TaskSlice";
import ListForm from "../components/list/List-form";

const classname = "lContainer_";
const listcss = (Class) => css[classname + Class];
const List = ({ ...props }) => {
  const params = useParams();
  const container = (Class) => css[`lContainer_${Class}`];

  const auth = useContext(AuthContext);

  // _____________________________
  // toolkit code
  // _____________________________

  const { lists, tasks, error, loading } = useSelector((state) => state.List);
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch lists from api
    if (lists.length === 0) dispatch(getLists({ body: {}, auth }));
    console.log("use");
  }, []);

  const createNewTask = (task) => {
    const payload = { body: { task, idList: params.id }, auth };
    dispatch(AddTask(payload));
  };
  // _____________________________
  // _____________________________

  if (loading) {
    toast.loading("please wait");
  } else {
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  }

  console.log(lists);

  if (params.id) {
    const getTasks = tasks.filter((task) => task.listId == params.id);
    const getList = lists.find((list) => list._id == params.id);
    console.log("my tasks is =>", getTasks);
    const taskss = () => {
      try {
        return getTasks;
      } catch (error) {
        return [];
      }
    };
    const NameList = () => {
      try {
        return getList.name;
      } catch (error) {
        return [];
      }
    };

    // const tasks = getList.task ?? [];
    return (
      <div className={css.lContainer}>
        <List_Side
          data={lists}
          auth={auth}
          sideActive={false}
          listName={NameList()}
        />

        <div className={container("row")}>
          <ListForm
            nameList={NameList}
            style={listcss}
            CreateHanlder={createNewTask}
            value={
              <span>
                Add new <strong>Task</strong>
              </span>
            }
          />
          {taskss().length > 0 ? (
            taskss().map((task) => (
              <List_Item
                key={task._id}
                auth={auth}
                id={task._id}
                title={task.task}
                status={task.status}
              />
            ))
          ) : (
            <h3>Please add any task</h3>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={css.lContainer}>
      <List_Side data={lists} auth={auth} sideActive={true} />
      <div className={container("row")}>
        {/* <h4>Select any collection</h4> */}
      </div>
    </div>
  );
};

export default List;
