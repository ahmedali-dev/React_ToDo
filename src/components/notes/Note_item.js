import { Link } from "react-router-dom";
import { Delete, Edit } from "./../icons/icons";
import style from "./NoteCom.module.scss";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../Store/Auth-context";
import { deleteNote } from "../../Store/slices/NotesSlice";

const css = (Class = "") =>
  Class.length == 0 ? style[`Note`] : style[`Note_link_${Class}`];
const Note = ({ title, note, id, ...props }) => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const deletenote = () => {
    if (!id) return;
    const payload = {
      body: {
        id,
      },
      auth,
    };

    dispatch(deleteNote(payload));
  };
  return (
    <div key={id} className={style.Note}>
      <Link to={"/notes/" + id}>
        <div className={style.Note_link}>
          <div className={css("title")} aria-label={!title ? "Title..." : ""}>
            {title}
          </div>
          <div className={css("note")} aria-label={!note ? "Note..." : ""}>
            <code>{note}</code>
          </div>
        </div>
      </Link>
      <div className={css("option")}>
        <div className={css("option_item")}>
          <Edit />
        </div>
        <div onClick={deletenote} className={css("option_item")}>
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default Note;
