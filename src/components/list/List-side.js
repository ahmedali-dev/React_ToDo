import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addLists } from "../../Store/slices/ListSlice";
import css from "./list.module.scss";
import ListForm from "./List-form";

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
  const dispatch = useDispatch();

  const [side, setSide] = useState(false);

  useEffect(() => {
    if (addinputref.current) {
      addinputref.current.focus();
    }
  }, []);

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
          ))}
      </div>
    </>
  );
};

export default List_Side;
