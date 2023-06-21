import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BuilderHanldeV2, FetchData } from "../../hooks/thunk";


const initialState = {
    notes: [],
    error: ''
}


export const getNotes = createAsyncThunk(
    'fetch/notes',
    async (payload, { rejectWithValue }) => {
        try {
            const { body, auth } = payload;
            return await FetchData('/notes', body, {}, auth);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const addNote = createAsyncThunk(
    'add/notes',
    async (payload, { rejectWithValue }) => {
        try {
            const { body, auth } = payload;
            return await FetchData('/notes/add', body, {}, auth);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteNote = createAsyncThunk(
    'delete/notes',
    async (payload, { rejectWithValue }) => {
        try {
            const { body, auth } = payload;
            return await FetchData('/notes/delete', body, {}, auth);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const NotesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        BuilderHanldeV2(
            builder,
            getNotes,
            (state, action) => {
                if (action.payload.notes.length > 0) state.notes = action.payload.notes;
            },
            (state, action, auth, res) => {
                console.log(res);
            }
        )
        // ___________
        // add new note
        // ___________
        BuilderHanldeV2(
            builder,
            addNote,
            (state, action) => {
                if (action.payload.notes.length > 0) state.notes = action.payload.notes;
            },
            (state, action, auth, res) => { }
        )
        // ___________
        // delete new note
        // ___________
        BuilderHanldeV2(
            builder,
            deleteNote,
            (state, action) => {
                if (action.payload.notes.length > 0) state.notes = action.payload.notes;
            },
            (state, action, auth, res) => { }
        )
    }
});


export default NotesSlice.reducer;