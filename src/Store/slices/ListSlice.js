import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    BuilderHanlde, FetchDataThunk
} from "../../hooks/thunk";
import { toast } from "react-hot-toast";

let initialState = {
    data: [],
    loading: false,
    error: ''
}



export const addList = createAsyncThunk(
    'add/list',
    async (payload) => {
        const { body, auth } = payload;
        const fetch = await FetchDataThunk('/lists/add', body, {}, auth);
        return fetch;
    }
);

export const addTask = createAsyncThunk('add/task',
    async (payload) => {
        const { body, auth } = payload;
        const fetch = await FetchDataThunk('/lists/task/add', body, {}, auth);
        return fetch;
    })


export const deleteTask = createAsyncThunk('delete/task',
    async (payload) => {
        const { body, auth } = payload;
        const fetch = await FetchDataThunk('/lists/task/delete', body, {}, auth);
        return fetch;
    })

export const editTask = createAsyncThunk('edit/task',
    async (payload) => {
        const { body, auth } = payload;
        const fetch = await FetchDataThunk('/lists/task/edit', body, {}, auth);
        return fetch;
    }
)

export const editStatus = createAsyncThunk('status/task',
    async (payload) => {
        const { body, auth } = payload;
        const fetch = await FetchDataThunk('/lists/task/edit/status', body, {}, auth);
        return fetch;
    }
)

const ListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        fetchLists: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        }
    },
    extraReducers: (builder) => {
        BuilderHanlde(builder, addList,
            (state, action) => {
                const { message, data } = action.payload;
                toast.success(message)
                state.data = [data, ...state.data]
            },
            (state, action) => {
            })
        BuilderHanlde(builder, addTask, (state, action) => {
            const { message, data } = action.payload;
            toast.success(message)
            state.data = data
        })
        BuilderHanlde(builder, deleteTask, (state, action) => {
            const { message, data } = action.payload;
            toast.success(message)
            state.data = data
        })
        BuilderHanlde(builder, editTask, (state, action) => {
            const { message, data } = action.payload;
            toast.success(message)
            state.data = data
        })
        BuilderHanlde(builder, editStatus, (state, action) => {
            const { message, data } = action.payload;
            toast.success(message)
            state.data = data
        })
    }
});

export const { fetchLists } = ListSlice.actions;

export default ListSlice.reducer;