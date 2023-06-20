import { useEffect, useState } from "react";
import style from './NoteCom.module.scss'
import Note from "./Note_item";
import { createMotionComponent } from "framer-motion";

const NotesOrdring = ({ data, ...props }) => {

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [orderRun, setOrderRun] = useState(true);
    const [rows, setRow] = useState([]);

    const ordaringNote = (event = null) => {

        let pagex = null;

        if (!event) {
            console.log('event fnot found')
            setOrderRun(false);
            pagex = window.innerWidth > 1200 ? 1200 : window.innerWidth;
        } else {
            pagex = event.currentTarget.innerWidth > 1200 ? 1200 : event.currentTarget.innerWidth;
        }
        const NotesCount = data.length;
        const NoteWidth = 270;
        const NotesColumn = Math.floor(pagex / NoteWidth) > 5 ? 5 : Math.floor(pagex / NoteWidth);

        // console.log(NotesCount / NotesColumn)
        const slice = Math.round(NotesCount / NotesColumn);
        let content = [];
        let contentobject = [];
        let indexSlice = slice;

        // console.log('________________________________________')
        // console.log(slice)
        for (let index = 0; index < (NotesCount + 1); index++) {



            if (index >= indexSlice) {
                // console.log(indexSlice)
                indexSlice += slice;
                content.push(contentobject)
                contentobject = [];
            }

            if (index == (NotesCount) && contentobject.length > 0) {
                content.push(contentobject);
                contentobject = [];
            }
            if (data[index]) contentobject.push(data[index]);


        }
        setRow(content)
        // console.log(content)

    }
    useEffect(() => {
        try {
            if (orderRun) ordaringNote();
            window.addEventListener('resize', ordaringNote)
        } catch (error) {
            console.log(window)
        }
    }, []);

    const css = (Class = '') => Class.length > 0 ? style[`NotesRows_${Class}`] : style.NotesRows;
    return <div className={css()}>
        {rows && rows.map(row => {
            // console.log(row)
            return <div className={css('row')}>
                {row.map(note => <Note
                    id={note.id}
                    title={note.title}
                    note={note.content}
                />)}
            </div>
        })}
        {/* <Note /> */}
    </div>
}

export default NotesOrdring;