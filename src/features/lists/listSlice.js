import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import instance from "../../hooks/axios";
import { toast } from "react-hot-toast";
import { BuilderHandleV3 } from "../../hooks/thunk";

const entityAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = entityAdapter.getInitialState({
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

const fetchList = createAsyncThunk(
  "list/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const { auth } = payload;
      const res = await instance.get("/lists", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const addList = createAsyncThunk(
  "list/add",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const res = await instance.post("/lists", body, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const deleteList = createAsyncThunk(
  "list/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const res = await instance.delete("/lists", {
        data: body,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const updateList = createAsyncThunk(
  "list/update",
  async (payload, { rejectWithValue }) => {
    try {
      const { body, auth } = payload;
      const query = `id=${body.id}&name=${body.name}`;
      const res = await instance.put(`/lists`, null, {
        params: body,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    BuilderHandleV3(builder, fetchList, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }

        state.error = action;
        return;
      }
      const data = action?.payload;
      entityAdapter.upsertMany(state, data?.lists);
      toast.success(data?.msg);
    });
    BuilderHandleV3(builder, addList, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }
        state.error = action;
        return;
      }
      const data = action.payload;
      entityAdapter.upsertOne(state, data?.result);
    });

    BuilderHandleV3(builder, deleteList, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }

        state.error = action;
        return;
      }
      const data = action.payload;
      entityAdapter.removeOne(state, data?.id);
      toast.success(data.msg);
    });
    BuilderHandleV3(builder, updateList, (err, state, action) => {
      if (err) {
        if (checkToken(action)) {
          return;
        }

        state.error = action;
        return;
      }
      const data = action.payload;
      console.log(data);
      entityAdapter.upsertOne(state, data?.update);
      toast.success(data.msg);
    });
  },
});

export const {
  selectAll: selectAllList,
  selectById: selectListById,
  selectIds: selectListIds,
} = entityAdapter.getSelectors((state) => state.list);

export { fetchList, addList, deleteList, updateList };
export default listSlice.reducer;
