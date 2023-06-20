import { useState, useRef, useEffect } from 'react';
import style from './NoteCom.module.scss'
import { Link } from 'react-router-dom';


const NoteForm = ({ ...props }) => {
    const titleRef = useRef(null);
    const noteRef = useRef(null);
    const [data, setdata] = useState({
        title: '',
        note: ''
    })


    const setDataFromInput = () => setdata({
        title: titleRef.current?.innerText,
        note: noteRef.current?.innerText
    });
    useEffect(() => {


        console.log(data)
    }, []);

    console.log(data)


    const css = (Class = '') => Class.length > 0 ? style[`NoteFrom_${Class}`] : style.NoteFrom;
    return (
        <>
            <Link to={'/notes'} className={style.mask}></Link>
            <div className={css()}>
                <div
                    className={css('title')}
                    onInput={(event) => { setDataFromInput(); console.log(data) }}
                    ref={titleRef}
                    contentEditable='true'
                    aria-label={data.title.length == 0 ? "Title..." : ''}></div>
                <div
                    onInput={(event) => { setDataFromInput(); console.log(data) }}
                    className={css('note')}
                    ref={noteRef}
                    contentEditable='true'
                    aria-label={data.note.length == 0 ? "Note..." : ''}></div>
            </div >
        </>
    );
};

export default NoteForm;