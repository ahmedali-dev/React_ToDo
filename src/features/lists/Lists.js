import React, { useState } from "react";
import List from "./List";
import css from "./../../assets/Lists.module.scss";
import ListFrom from "./ListFrom";
import { Add, Close } from "../../components/icons/icons";
import { useParams } from "react-router-dom";

const Lists = ({ showList }) => {
  const [form, showForm] = useState(false);
  const { id } = useParams();
  console.log(id);
  return (
    <div
      className={`${css.list} ${showList && css.list_flow_active} ${
        id && css.list_flow
      }`}
    >
      <div className={css.list_header}>
        <h1>Lists</h1>
        <div onClick={() => showForm(true)}>
          <Add />
        </div>
      </div>
      {showList && (
        <div className={css.list_close}>
          <Close />
        </div>
      )}
      <List />
      <ListFrom form={{ form, showForm }} />
    </div>
  );
};

export default Lists;
