import { useEffect, useState } from "react";
import Note from "./Note_item";

const NotesOrdring = ({ data, ...props }) => {

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [orderRun, setOrderRun] = useState(true);
    const [rows, setRow] = useState([]);

    const ordaringNote = () => {
        setOrderRun(false);
        const pagex = window.innerWidth > 1200 ? 1200 : window.innerWidth;
        const NotesCount = data.length;
        const NoteWidth = 270;
        const NotesColumn = Math.floor(pagex / NoteWidth) > 5 ? 5 : Math.floor(pagex / NoteWidth);

        // console.log(NotesCount / NotesColumn)
        const slice = Math.floor(NotesCount / NotesColumn);
        let content = [];
        let contentobject = [];
        let indexSlice = slice;
        console.log('00000000000000000000000000000000000000')
        for (let index = 0; index < (NotesCount + 1); index++) {

            // if (index % slice == 0) {
            //     indexSlice = index;

            // };
            // if (index == 0) {
            //     content[indexSlice] =
            //         [
            //             data[index],
            //         ]
            // }else{

            // }


            if (index >= indexSlice) {
                console.log(indexSlice)
                indexSlice += slice;
                content.push(contentobject)
                contentobject = [];
            }

            if (index == (NotesCount) && contentobject.length > 0) {
                content.push(contentobject);
                contentobject = [];
            }

            if (data[index]) contentobject.push(data[index]);



            // }

            console.log(index, '==>', data[index])
        }
        console.log(slice)
        console.log(content)
        setRow(content);
        // setRow(data.map((note,index) => {
        //     const obj = [];

        // }))




    }
    useEffect(() => {
        try {
            if (orderRun) ordaringNote();
            window.addEventListener('resize', (event) => {
                const pagex = event.currentTarget.innerWidth > 1200 ? 1200 : event.currentTarget.innerWidth;
                const NotesCount = data.length;
                const NoteWidth = 270;
                const NotesColumn = Math.floor(pagex / NoteWidth) > 5 ? 5 : Math.floor(pagex / NoteWidth);

                // console.log(NotesCount / NotesColumn)
                const slice = Math.floor(NotesCount / NotesColumn);
                let content = [];
                let contentobject = [];
                let indexSlice = slice;
                console.log('00000000000000000000000000000000000000')
                for (let index = 0; index < (NotesCount + 1); index++) {


                    if (index >= indexSlice) {
                        console.log(indexSlice)
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
            })
        } catch (error) {
            console.log(window)
        }
        // return async () => {
        //     await delay(1000);

        // }
    }, []);

    return <div style={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'wrap',
        gap: '2rem',

    }}>
        {rows && rows.map(row => {
            // console.log(row)
            return <div>
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