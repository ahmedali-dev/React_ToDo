import React, { useEffect } from "react";
import NotesForm from "./NotesForm";
import css from "../../assets/Notes.module.scss";
import Notes from "./Notes";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";

const NotesPage = ({ add }) => {
  const { id } = useParams();
  const note = useSelector((state) => selectNoteById(state, id));
  console.log(id, note);

  useEffect(() => {
    try {
      if (add) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    } catch (error) {}
    return () => {};
  }, [add]);
  return (
    <div className={css.notes}>
      <Notes />
      {add && <NotesForm />}
      {id && note ? (
        <NotesForm note={note} />
      ) : id ? (
        <Navigate to={"/notes"} replace={true} />
      ) : (
        ""
      )}
    </div>
  );
};

export default NotesPage;
