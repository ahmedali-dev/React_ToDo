import React, { useState } from "react";
import Button from "../../components/UI/Button";
import { Back, Close } from "../../components/icons/icons";
import css from "../../assets/Notes.module.scss";
import { useNavigate } from "react-router-dom";
const NoteFormHeader = ({ saveNote, state, note }) => {
  const [model, setModel] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {model && (
        <>
          <article className={css.form_model_mask}></article>
          <article className={css.form_model}>
            <h1>Save change</h1>
            <div className={css.form_model_btn}>
              <Button onClick={() => navigate("/notes")}>Cancel</Button>
              <Button
                onClick={() => {
                  saveNote();
                  navigate("/notes");
                }}
              >
                Save
              </Button>
            </div>
          </article>
        </>
      )}
      <article className={css.form_options}>
        <Button
          onClick={() => {
            if (!note) return navigate("/notes");
            if (state.note === note.note && state.title === note.title)
              return navigate("/notes");
            setModel(state.note !== note.note || state.title !== note.title);
          }}
        >
          <Back />
        </Button>
        <Button onClick={saveNote}>Save</Button>
      </article>
    </>
  );
};

export default NoteFormHeader;
