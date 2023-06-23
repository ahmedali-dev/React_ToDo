import css from "./list.module.scss";
import Input from "./../UI/Input";
import { Delete, Edit, Mark } from "./../icons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteTask, EditTask } from "../../Store/slices/TaskSlice";

const classname = "list_item";
const listcss = (Class) => css[classname + Class];
const List_Item = ({ id, title, auth, status, ...props }) => {
  const inputEdit = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false);

  let editComp = <div className={css[classname + "_title"]}>{title}</div>;
  let editCompIcon = (
    <div
      className={css[classname + "_options_option"]}
      onClick={() => {
        setedit(true);
        setTimeout(() => {
          inputEdit.current.focus();
        }, 1000);
      }}
    >
      <Edit />
    </div>
  );

  const deletetask = () => {
    const body = { idTask: id, idList: params.id };
    dispatch(DeleteTask({ body, auth }));
  };

  const editHandler = () => {
    setedit(false);
    const editValue = inputEdit.current?.value;
    if (editValue !== title) {
      const body = {
        idTask: id,
        idList: params.id,
        task: editValue,
        action: "task",
      };

      dispatch(EditTask({ body, auth }));
    }
  };

  const editstatus = async () => {
    console.log(status);
    const check = status ? false : true;
    const body = {
      idTask: id,
      idList: params.id,
      action: "status",
    };
    console.log("body before update", body);

    dispatch(EditTask({ body, auth }));
  };

  if (edit) {
    editComp = (
      <div className={css[classname + "_title"]}>
        <Input
          ref={inputEdit}
          classname={css[classname + "_title_edit"]}
          defaultValue={title}
        />
      </div>
    );

    editCompIcon = (
      <div className={css[classname + "_options_option"]} onClick={editHandler}>
        <Mark />
      </div>
    );
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div key={id} className={`${css[classname]} ${status ? css.active : ""}`}>
      <div className={css[classname + "_checkbox"]}>
        <Input
          id={id}
          defaultChecked={status}
          type="checkbox"
          classname={`
                    ${css[classname + "_checkbox_check"]}
                `}
          label={
            <>
              <span></span>
              <span></span>
            </>
          }
          onClick={editstatus}
        />
      </div>
      {editComp}
      <div className={css[classname + "_options"]}>
        {editCompIcon}

        <div
          onClick={deletetask}
          className={css[classname + "_options_option"]}
        >
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default List_Item;
