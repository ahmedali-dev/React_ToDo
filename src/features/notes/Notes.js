import React from "react";
import css from "../../assets/Notes.module.scss";
import { AddNote } from "../../components/icons/icons";
import Note from "./Note";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllNotes } from "./notesSlice";
const Notes = () => {
  const notes = useSelector(selectAllNotes);

  return (
    <div className={css.wrap}>
      {notes && notes?.map((note) => <Note key={note._id} note={note} />)}
      <Link to={"/notes/add"} className={`${css.card} ${css.addCard}`}>
        <AddNote />
      </Link>
    </div>
  );
};

export default Notes;
