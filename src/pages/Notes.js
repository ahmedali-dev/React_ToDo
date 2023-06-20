import React, { useRef } from 'react';
import NotesOrdring from '../components/notes/Notes_ordring';

const dummyNotes = [
    {
        id: 1,
        title: "Meeting Notes asdfas",
        content: `
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.
        Remember to discuss project timeline and budget.


        `,
        date: "2023-06-19"
    },
    {
        id: 2,
        title: "Grocery List",
        content: "Buy milk, eggs, bread, and apples from the supermarket.",
        date: "2023-06-18"
    },
    {
        id: 3,
        title: "Ideas",
        content: "Start working on that novel you've always wanted to write.",
        date: "2023-06-17"
    },
    {
        id: 4,
        title: "Holiday Plans",
        content: "Planning to spend a week at the beach. Can't wait!",
        date: "2023-06-16"
    },
    {
        id: 5,
        title: "Recipe",
        content: "Try out the new pasta recipe for tonight's dinner.",
        date: "2023-06-15"
    },
    {
        id: 6,
        title: "Workout Routine",
        content: "Remember to do 30 minutes of cardio and 15 minutes of strength training.",
        date: "2023-06-14"
    },
    {
        id: 7,
        title: "Book Recommendations",
        content: "Check out 'The Alchemist' and 'To Kill a Mockingbird'.",
        date: "2023-06-13"
    },
    {
        id: 8,
        title: "Movie Night",
        content: "Watch the latest superhero movie with friends on Saturday.",
        date: "2023-06-12"
    }
];



const Notes = () => {

    return (
        <div>
            <NotesOrdring data={dummyNotes} />
        </div>

    );
}

export default Notes;