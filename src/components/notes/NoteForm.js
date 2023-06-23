import { useState, useRef, useEffect, useContext } from 'react';
import style from './NoteCom.module.scss'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthContext from '../../Store/Auth-context';
import { addNote } from '../../Store/slices/NotesSlice';


const NoteForm = ({ note, ...props }) => {
    const titleRef = useRef(null);
    const noteRef = useRef(null);
    const dispatch = useDispatch();
    const [data, setdata] = useState({
        title: '',
        note: ''
    })



    const auth = useContext(AuthContext);
    let timeout = null;

    const setDataFromInput = () => {
        if (timeout) clearTimeout(timeout);

        // timeout = setTimeout(() => {
        setdata({
            title: titleRef.current?.innerText,
            note: noteRef.current?.innerText,
        });
        // }, 2000);
    };

    useEffect(() => {
        const payload = {
            body: {
                title: data.title,
                noteBody: data.note
            }, auth
        };

    }, [data]);


    useEffect(() => {
        if (!note) return;
        titleRef.current.innerText = note.title;
        noteRef.current.innerText = note.note;
        setDataFromInput()
    }, []);


    const updateNotes = () => {


        if (
            data.note == note.note &&
            data.title == note.title
        ) return;

        const payload = {
            body: {
                id: note.id,
                title: data.title,
                noteBody: data.note
            }, auth
        };

        dispatch(addNote(payload));
    }
    const addNotes = () => {
        if (note) return updateNotes();
        const payload = {
            body: {
                title: data.title,
                noteBody: data.note
            }, auth
        };
        dispatch(addNote(payload))
    }
    const css = (Class = '') => Class.length > 0 ? style[`NoteFrom_${Class}`] : style.NoteFrom;
    return (
        <>
            <Link
                onClick={addNotes}
                to={'/notes'} className={style.mask}></Link>
            <div className={css()}>
                <Link
                    onClick={addNotes}
                    to={'/notes'} className={css('ArrowBack')}><i className="las la-arrow-left"></i></Link>
                <div
                    className={css('title')}
                    onInput={(event) => { setDataFromInput(); }}
                    ref={titleRef}
                    contentEditable='true'
                    aria-label={data.title.length == 0 ? "Title..." : ''}>

                </div>
                <div
                    onInput={(event) => { setDataFromInput(); }}
                    className={css('note')}
                    ref={noteRef}
                    contentEditable='true'
                    aria-label={data.note.length == 0 ? "Note..." : ''}>

                </div>
            </div >
        </>
    );
};

export default NoteForm;