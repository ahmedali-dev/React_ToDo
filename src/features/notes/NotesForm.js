import React, { useReducer, useEffect } from "react";
import css from "../../assets/Notes.module.scss";
import NoteFormHeader from "./NoteFormHeader";
import { createNote, noteError, noteStatus, updateNote } from "./notesSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

const reducerFun = (state, action) => {
  return { ...state, ...action };
};
const NotesForm = ({ note }) => {
  const error = useSelector(noteError);
  const status = useSelector(noteStatus);
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, reducer] = useReducer(reducerFun, {
    title: note?.title ?? "",
    note: note?.note ?? "",
  });
  console.log(state);
  useEffect(() => {
    try {
      //   document.body.style.overflow = "hidden";
    } catch (error) {}

    return () => {
      console.log("clean");
    };
  }, []);

  let time;
  const saveNote = () => {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      const canSave = [].some(Boolean);

      console.log("🚀 ~ file: NotesForm.js:36 ~ saveNote ~ canSave:", canSave);

      if (state.title.length === 0 && state.note.length === 0) return;

      const payload = {
        body: {
          title: state.title,
          note: state.note,
        },
        navigate,
        auth,
      };

      if (!id) {
        console.log("not found is");
        dispatch(createNote(payload));
      } else {
        console.log("found is");
        payload.body.id = id;
        dispatch(updateNote(payload));
      }
      console.log("🚀 ~ file: NotesForm.js:47 ~ saveNote ~ payload:", payload);
    }, 1000);
  };

  if (error) {
    console.log("🚀 ~ file: NotesForm.js:36 ~ NotesForm ~ error:", error);
  }
  return (
    <>
      <article className={css.form_mask}></article>
      <div className={css.form}>
        <NoteFormHeader saveNote={saveNote} state={state} note={note} />
        <div
          className={css.form_title}
          onInput={(event) => reducer({ title: event.target.innerText.trim() })}
          contentEditable="true"
          suppressContentEditableWarning={true}
          aria-label={state.title.trim().length === 0 ? "Title..." : ""}
          spellCheck="false"
        >
          <code>{note?.title}</code>
        </div>
        <div
          className={css.form_note}
          onInput={(event) => reducer({ note: event.target.innerText.trim() })}
          contentEditable="true"
          suppressContentEditableWarning={true}
          role="textbox"
          dir="ltr"
          spellCheck="false"
          aria-label={state.note.trim().length === 0 ? "Note..." : ""}
        >
          <code> {note?.note}</code>
        </div>
      </div>
    </>
  );
};

export default NotesForm;
