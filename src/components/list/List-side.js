import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addLists, deleteList, updateList } from "../../Store/slices/ListSlice";
import css from "./list.module.scss";
import ListForm from "./List-form";
import { Delete, Edit, Mark } from "../icons/icons";
import { toast } from "react-hot-toast";
import Input from "../UI/Input";

const sidecss = (n) => css[`side_${n}`];
const addcss = (n) => css[`add_${n}`];

const List_Side = ({
  auth,
  data,
  add,
  addhandle,
  sideActive,
  listName,
  ...props
}) => {
  const addinputref = useRef(null);
  const editInputRef = useRef(null);
  const dispatch = useDispatch();

  const [side, setSide] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (addinputref.current) {
      addinputref.current.focus();
    }
  }, []);

  useEffect(() => {
    if (edit === false) return;
    console.log("e");
    editInputRef.current.focus();
  }, [edit]);

  const createNewList = async (list) => {
    const payload = { body: { list }, auth };
    dispatch(addLists(payload));
  };

  const sideToggle = (active = false) => (
    <div className={css.toggle_container}>
      <div
        className={`${css.sideToggle} ${active && css.sideToggle_active}`}
        onClick={() => setSide(!side)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {!active && <h3>{listName}</h3>}
    </div>
  );

  const getData = () => {
    try {
      return data ?? [];
    } catch (error) {
      return [];
    }
  };

  const deleteHandler = (id) => {
    if (id.length === 0) return toast.error("can't delete the list");
    const payload = {
      body: { idList: id },
      auth,
    };
    dispatch(deleteList(payload));
  };

  const editHandlerUpdate = (id, value) => {
    setEdit(false);
    if (!editInputRef) return;
    const editValue = editInputRef.current.value;
    if (editValue === value) return;
    const payload = {
      body: {
        idList: id,
        list: editValue,
      },
      auth,
    };
    console.log(payload);
    dispatch(updateList(payload));
  };

  const editHandler = (id) => {
    if (edit === id) return setEdit(false);
    setEdit(id);
  };
  return (
    <>
      {!sideActive && sideToggle()}
      <div
        key={Math.floor(Math.random() * 42000).toString(16)}
        className={`
          ${css.side}
          ${!sideActive && side && sidecss("active")}
          ${sideActive && sidecss("activeNP")}
        `}
      >
        {!sideActive && sideToggle(true)}

        {/* _______________________ */}
        {/* add collection */}
        {/* _______________________ */}

        <ListForm
          style={sidecss}
          CreateHanlder={createNewList}
          value={
            <span>
              Add new <strong>List</strong>
            </span>
          }
        />

        {/* _______________________ */}
        {/* lists mapping */}
        {/* _______________________ */}
        {data &&
          data.length > 0 &&
          data.map((d) => (
            <div className={sidecss("row")}>
              {edit !== d._id ? (
                <NavLink
                  onClick={() => setSide(false)}
                  key={d._id}
                  className={({ isActive }) =>
                    isActive
                      ? `${sidecss("link")} ${sidecss("link_active")}`
                      : sidecss("link")
                  }
                  to={`/lists/${d._id}`}
                >
                  <div className={sidecss("link_item")}>
                    <h3>{d.name}</h3>
                  </div>
                </NavLink>
              ) : (
                <div className={`${sidecss("edit")}`}>
                  <Input
                    ref={editInputRef}
                    classname={sidecss("edit_input")}
                    defaultValue={d.name}
                  />
                </div>
              )}
              <div className={sidecss("options")}>
                {edit !== d._id ? (
                  <div
                    onClick={editHandler.bind(null, d._id)}
                    className={sidecss("options_option")}
                  >
                    <Edit />
                  </div>
                ) : (
                  <div
                    onClick={editHandlerUpdate.bind(null, d._id, d.name)}
                    className={sidecss("options_option")}
                  >
                    <Mark />
                  </div>
                )}

                <div
                  onClick={deleteHandler.bind(null, d._id)}
                  className={sidecss("options_option")}
                >
                  <Delete />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default List_Side;
