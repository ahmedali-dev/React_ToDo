import React, { useState } from "react";
import { Mark } from "./../../components/icons/icons";
import css from "./../../assets/Lists.module.scss";
import Input from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { updateList } from "./listSlice";

const ListEditForm = ({ list, setEdit }) => {
  const [value, setValue] = useState("");
  const auth = useAuth();
  const dispatch = useDispatch();
  const editHandle = (id, name) => {
    if (value.trim().length === 0 || value === name) {
      setEdit(null);
      setValue("");
      return;
    }

    const payload = {
      body: {
        id,
        name: value,
      },
      auth,
    };
    dispatch(updateList(payload));
    console.log(value);
    setValue("");
    setEdit(null);
  };
  return (
    <div className={css.editList}>
      <Input
        onChange={(e) => setValue(e.target.value)}
        defaultValue={list.name}
        classname={css.editList_input}
      />
      <div
        className={
          value === list.name || value.trim().length === 0
            ? `${css.editList_mark} ${css.editList_mark_equal}`
            : css.editList_mark
        }
        onClick={() => editHandle(list._id, list.name)}
      >
        <Mark />
      </div>
    </div>
  );
};

export default ListEditForm;
