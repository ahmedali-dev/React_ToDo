import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BuilderHanlde,
  FetchData,
  FetchDataThunk,
  BuilderHanldeV2,
} from "../../hooks/thunk";
import { toast } from "react-hot-toast";
import { AddTask, DeleteTask, EditTask } from "./TaskSlice";

let initialState = {
  lists: [],
  tasks: [],
  loading: false,
  error: "",
};

export const addTask = createAsyncThunk("add/task", async (payload) => {
  const { body, auth } = payload;
  const fetch = await FetchDataThunk("/lists/task/add", body, {}, auth);
  return fetch;
});

export const deleteTask = createAsyncThunk("delete/task", async (payload) => {
  const { body, auth } = payload;
  const fetch = await FetchDataThunk("/lists/task/delete", body, {}, auth);
  return fetch;
});

export const editTask = createAsyncThunk("edit/task", async (payload) => {
  const { body, auth } = payload;
  const fetch = await FetchDataThunk("/lists/task/edit", body, {}, auth);
  return fetch;
});

export const editStatus = createAsyncThunk("status/task", async (payload) => {
  const { body, auth } = payload;
  const fetch = await FetchDataThunk("/lists/task/edit/status", body, {}, auth);
  return fetch;
});

export const getLists = createAsyncThunk(
  "fetch/lists",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      return await FetchData("/lists", body, {}, auth);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addLists = createAsyncThunk(
  "add/lists",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      return await FetchData("/lists/add", body, {}, auth);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    fetchLists: (state, action) => {
      const { data } = action.payload;
      state.data = [...(data ?? null)];
    },
  },
  extraReducers: (builder) => {
    BuilderHanldeV2(
      builder,
      getLists,
      (state, action) => {
        state.lists = action.payload.lists;
        state.tasks = action.payload.task;
      },
      (state, action, auth, res) => {
        console.log(res);
      }
    );
    BuilderHanldeV2(builder, addLists, (state, action) => {
      const { result } = action.payload;
      state.lists = result;
    });

    BuilderHanldeV2(
      builder,
      AddTask,
      (state, action) => {
        console.log("new task add => ", action.payload.result);
        state.tasks = [...state.tasks, action.payload.result];
      },
      (state, action) => {
        console.log(action);
      }
    );

    BuilderHanldeV2(
      builder,
      DeleteTask,
      (state, action) => {
        state.tasks = action.payload.result;
      },
      (state, action) => {
        console.log(action);
      }
    );

    BuilderHanldeV2(
      builder,
      EditTask,
      (state, action) => {
        console.log(action);
        const { task, idTask, status } = action.meta.arg.body;
        console.log(status);
        const TaskIndex = state.tasks.findIndex((index) => index._id == idTask);
        if (!TaskIndex) return;
        if (
          action.payload?.message == "Task updated successfully" &&
          status !== undefined
        ) {
          state.tasks[TaskIndex].status = !state.tasks[TaskIndex].status;
          return;
        }

        state.tasks[TaskIndex].task = task;
      },
      (state, action) => {
        console.log(action);
      }
    );
  },
});

export const { fetchLists } = ListSlice.actions;

export default ListSlice.reducer;
