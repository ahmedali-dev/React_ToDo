import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import instance from "../../hooks/axios";
import { BuilderHandleV3 } from "../../hooks/thunk";
import { toast } from "react-hot-toast";

const url = "/notes";
const noteAdapter = createEntityAdapter({
  selectId: (note) => note._id,
});

const initialState = noteAdapter.getInitialState({
  error: null,
  status: "idle",
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

const getNote = createAsyncThunk(
  "notes/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.get(url, {
        headers: {
          Authorization: `Bearer ${payload?.auth?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const deleteNote = createAsyncThunk(
  "notes/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.delete(url, {
        data: payload?.body,
        headers: {
          Authorization: `Bearer ${payload?.auth?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const createNote = createAsyncThunk(
  "notes/post",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.post(url, payload?.body, {
        headers: {
          Authorization: `Bearer ${payload?.auth?.token}`,
        },
      });
      return { ...res.data, navigate: payload.navigate };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const updateNote = createAsyncThunk(
  "notes/put",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.put(url, payload?.body, {
        headers: {
          Authorization: `Bearer ${payload?.auth?.token}`,
        },
      });
      return { ...res.data, navigate: payload.navigate };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    BuilderHandleV3(builder, getNote, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }

      const payload = action.payload;
      noteAdapter.upsertMany(state, payload?.notes);
    });
    BuilderHandleV3(builder, deleteNote, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }

      const payload = action.payload;
      noteAdapter.removeOne(state, payload?.id);
      toast.success(payload?.msg);
    });
    BuilderHandleV3(builder, createNote, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }

      const payload = action.payload;
      toast.success(payload?.msg);
      payload.navigate(`/notes/${payload?.note?._id}`, { replace: true });
      noteAdapter.upsertOne(state, payload?.note);
    });
    BuilderHandleV3(builder, updateNote, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }

      const payload = action.payload;
      toast.success(payload?.msg);
      noteAdapter.upsertOne(state, payload?.note);
    });
  },
});

export { getNote, deleteNote, createNote, updateNote };
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectAllNotesIds,
} = noteAdapter.getSelectors((state) => state.notes);
export const noteError = (state) => state.notes.error;
export const noteStatus = (state) => state.notes.status;
export default notesSlice.reducer;
