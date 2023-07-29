import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Delete, Edit, Mark } from "./../../components/icons/icons";
import css from "./../../assets/Lists.module.scss";
import Input from "../../components/UI/Input";
import ListEditForm from "./ListEditForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, selectAllList } from "./listSlice";
import useAuth from "../../hooks/useAuth";

const List = ({ ...props }) => {
  const [edit, setEdit] = useState(null);
  const lists = useSelector(selectAllList);
  const dispatch = useDispatch();
  const auth = useAuth();
  const deleteListHandle = (id) => {
    if (!id) return;
    const payload = {
      body: {
        id,
      },
      auth,
    };
    dispatch(deleteList(payload));
  };

  return (
    <>
      {lists &&
        lists?.map((list) => (
          <div key={list._id} className={css.wrap}>
            {edit !== list._id ? (
              <NavLink
                to={`/lists/${list._id}`}
                className={({ isActive }) => {
                  return isActive ? `${css.item} ${css.item_active}` : css.item;
                }}
                key={list._id}
              >
                <h3>{list.name}</h3>
              </NavLink>
            ) : (
              <ListEditForm list={list} setEdit={setEdit} />
            )}

            {edit !== list._id && (
              <div className={css.option}>
                <span onClick={() => setEdit(list._id)}>
                  <Edit />
                </span>
                <span onClick={deleteListHandle.bind(null, list._id)}>
                  <Delete />
                </span>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default List;
