import React from "react";
import css from "../../assets/Notes.module.scss";
import { Delete } from "../../components/icons/icons";
import { Link } from "react-router-dom";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";
import { parseISO } from "date-fns/fp";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { deleteNote } from "./notesSlice";
const Note = ({ note }) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const deleteNoteHandle = () => {
    console.log(note);
    if (!note._id) return toast.error("can not remove note");
    const payload = {
      body: {
        id: note._id,
      },
      auth,
    };
    dispatch(deleteNote(payload));
  };
  return (
    <div className={`${css.card} ${css.cardNote}`}>
      <Link to={`/notes/${note._id}`} className={css.cardNote_content}>
        <h1 className={css.cardNote_content_title}>{note.title}</h1>
        <p className={css.cardNote_content_note}>{note.note.slice(0, 100)}</p>
      </Link>
      <div className={css.cardNote_moreOptions}>
        <div>
          {formatDistanceToNow(parseISO(note.date), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </div>
        <div onClick={deleteNoteHandle}>
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default Note;
