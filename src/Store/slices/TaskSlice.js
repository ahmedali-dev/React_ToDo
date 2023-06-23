import { BuilderHanldeV2, FetchData } from "../../hooks/thunk";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchHelper = (url, payload, rejectWithValue) => {
  try {
    const { body, auth } = payload;
    return FetchData(`/lists/task/${url}`, body, {}, auth);
  } catch (error) {
    return rejectWithValue(error);
  }
};

const AddTask = createAsyncThunk(
  "add/task",
  async (payload, { rejectWithValue }) => {
    return fetchHelper("add", payload, rejectWithValue);
  }
);

const DeleteTask = createAsyncThunk(
  "delete/task",
  async (payload, { rejectWithValue }) => {
    return fetchHelper("delete", payload, rejectWithValue);
  }
);

const EditTask = createAsyncThunk(
  "edit/task",
  async (payload, { rejectWithValue }) =>
    fetchHelper("edit", payload, rejectWithValue)
);
export { AddTask, DeleteTask, EditTask };
// const initialState = {
//     task
// }
// const TaskSlice = createSlice({
//     name: "TaskSlice"
// })
// export default TaskSlice.reducer;
