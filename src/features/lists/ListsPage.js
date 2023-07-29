import React from "react";
import css from "./../../assets/Lists.module.scss";
import Lists from "./Lists";
import Tasks from "./../tasks/Tasks";
import { useParams } from "react-router-dom";
import CateNote from "../../components/icons/cateWrite.png";
const ListsPage = () => {
  const { id } = useParams();
  return (
    <div className={css.lists}>
      <Lists />
      {id ? (
        <Tasks />
      ) : (
        <div className={css.lists_notSelect}>
          <img src={CateNote} alt={"image "} />
        </div>
      )}
    </div>
  );
};

export default ListsPage;
