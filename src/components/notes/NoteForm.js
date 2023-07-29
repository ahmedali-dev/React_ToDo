// import { useState, useRef, useEffect, useContext } from "react";
// import style from "./NoteCom.module.scss";
// import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import AuthContext from "../../Store/Auth-context";
// import { addNote, RemoveId } from "../../Store/slices/NotesSlice";

// const NoteForm = ({ note, ...props }) => {
//   const titleRef = useRef(null);
//   const noteRef = useRef(null);
//   const dispatch = useDispatch();
//   const [data, setdata] = useState({
//     title: "",
//     note: "",
//   });

//   const auth = useContext(AuthContext);
//   const { id } = useSelector((state) => state.Notes);
//   const [params, setparams] = useSearchParams({ id: "" });
//   const NoteId = params.get("id");
//   const navigate = useNavigate();
//   let timeout = null;

//   const setDataFromInput = () => {
//     if (timeout) clearTimeout(timeout);

//     // timeout = setTimeout(() => {
//     setdata({
//       title: titleRef.current?.innerText,
//       note: noteRef.current?.innerText,
//     });
//     // }, 2000);
//   };

//   useEffect(() => {
//     const payload = {
//       body: {
//         title: data.title,
//         noteBody: data.note,
//       },
//       auth,
//     };
//   }, [data]);

//   useEffect(() => {
//     if (!note) return;
//     titleRef.current.innerText = note.title;
//     noteRef.current.innerText = note.note;
//     setparams();
//     setDataFromInput();
//   }, []);

//   const updateNotes = () => {
//     if (data.note == note.note && data.title == note.title) return;
//     if (data.note.length === 0 && data.title.length === 0) return;
//     console.log("adding noew");
//     const payload = {
//       body: {
//         id: note._id,
//         title: data.title,
//         noteBody: data.note,
//       },
//       auth,
//     };

//     dispatch(addNote(payload));
//   };

//   const UpdateNoteWidthId = () => {
//     if (data.note.length === 0 && data.title.length === 0) return;
//     console.log("update id noew");
//     const payload = {
//       body: {
//         id: NoteId,
//         title: data.title,
//         noteBody: data.note,
//       },
//       auth,
//       setparams,
//     };
//     dispatch(addNote(payload));
//   };

//   const addNotes = () => {
//     console.log(NoteId);
//     if (note) return updateNotes();
//     if (NoteId) return UpdateNoteWidthId();
//     if (id && NoteId == id) {
//       console.log("id");
//     }
//     if (data.note.length === 0 && data.title.length === 0) return;
//     console.log("adding noew");
//     const payload = {
//       body: {
//         title: data.title,
//         noteBody: data.note,
//       },
//       auth,
//       setparams,
//     };
//     dispatch(addNote(payload));
//   };

//   const css = (Class = "") =>
//     Class.length > 0 ? style[`NoteFrom_${Class}`] : style.NoteFrom;
//   return (
//     <>
//       <div onClick={addNotes} to={"/notes"} className={style.mask}></div>
//       <div className={css()}>
//         <div className={css("tool")}>
//           <Link
//             onClick={addNotes}
//             to={"/notes"}
//             className={css("tool_ArrowBack")}
//           >
//             <i className="las la-times"></i>
//           </Link>
//           <div onClick={addNotes} className={css("tool_ArrowBack")}>
//             <i class="lar la-save"></i>
//             <span>Save</span>
//           </div>
//         </div>

//         <div
//           className={css("title")}
//           onInput={(event) => {
//             setDataFromInput();
//           }}
//           ref={titleRef}
//           contentEditable="true"
//           aria-label={data.title.length == 0 ? "Title..." : ""}
//         ></div>
//         <div
//           onInput={(event) => {
//             setDataFromInput();
//           }}
//           className={css("note")}
//           ref={noteRef}
//           contentEditable="true"
//           aria-label={data.note.length == 0 ? "Note..." : ""}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default NoteForm;
