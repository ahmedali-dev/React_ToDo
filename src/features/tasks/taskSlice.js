import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import instance from "../../hooks/axios";
import { BuilderHandleV3 } from "../../hooks/thunk";

const taskAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = taskAdapter.getInitialState({
  status: "idle",
  error: null,
});

const checkToken = (response) => {
  const payload = response?.payload;
  if (Number(payload?.status) === 401) {
    const { auth } = response?.meta.arg;
    auth.logout();
    return true;
  }
  return false;
};

const getTask = createAsyncThunk(
  "task/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const { auth } = payload;
      const res = await instance.get("/tasks", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);
const addTask = createAsyncThunk(
  "task/add",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const res = await instance.post("/tasks", body, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);
const deleteTask = createAsyncThunk(
  "task/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const res = await instance.delete("/tasks", {
        data: body,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

const updateTask = createAsyncThunk(
  "task/update",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const res = await instance.put(`/tasks`, body, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);
const toggleTask = createAsyncThunk(
  "task/toggle",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, taskId, auth } = payload;
      const res = await instance.put(`/tasks/${taskId}`, body, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    BuilderHandleV3(builder, getTask, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      taskAdapter.upsertMany(state, data?.tasks);
    });

    BuilderHandleV3(builder, addTask, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      taskAdapter.upsertOne(state, data?.task);
    });

    BuilderHandleV3(builder, deleteTask, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      taskAdapter.removeOne(state, data?.removed);
    });
    BuilderHandleV3(builder, updateTask, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      taskAdapter.upsertOne(state, data?.task);
    });
    BuilderHandleV3(builder, toggleTask, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      taskAdapter.upsertOne(state, data?.task);
    });
  },
});

export { getTask, addTask, deleteTask, updateTask, toggleTask };
export const {
  selectAll: selectAllTask,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
} = taskAdapter.getSelectors((state) => state.tasks);
export const selectAlltaskByListId = createSelector(
  [selectAllTask, (state, listId, filter) => [listId, filter]],
  (tasks, [listId, filter]) =>
    tasks.filter((task) => {
      switch (filter) {
        case undefined:
        case "all":
          return task.listId === listId;
          break;
        case "start":
          return task.listId === listId && task.status === false;
          break;
        case "finish":
          return task.listId === listId && task.status === true;
          break;
        default:
          return task.listId === listId;
      }
    })
);
export default taskSlice.reducer;
