import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { BuilderHandleV3 } from "../../hooks/thunk";
import instance from "./../../hooks/axios";
import { toast } from "react-hot-toast";
const initialState = {
  data: {},
  email: null,
  token: null,
  nextPage: 0,
  status: "idle",
  error: null,
};

const CheckEmail = createAsyncThunk(
  "reset/email",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.get("/resetPass", {
        params: payload.params,
      });

      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

const CheckCode = createAsyncThunk(
  "reset/code",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.post("/resetPass", payload.body);

      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
const UpdatePassword = createAsyncThunk(
  "reset/UpdatePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.patch("/resetPass", payload.body, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });

      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    BuilderHandleV3(builder, CheckEmail, (err, state, action) => {
      if (err) return (state.error = action);
      state.nextPage = 1;
      state.email = action?.meta?.arg?.params?.email;
      toast.success(action?.payload?.msg);
    });
    BuilderHandleV3(builder, CheckCode, (err, state, action) => {
      if (err) return (state.error = action);
      state.nextPage = 2;
      state.token = action?.payload?.token;
      toast.success(action?.payload?.msg);
    });
    BuilderHandleV3(builder, UpdatePassword, (err, state, action) => {
      if (err) return (state.error = action);
      state.nextPage = 3;
      toast.success(action?.payload?.msg);
    });
  },
});
// (state) => state.reset
export { CheckEmail, CheckCode, UpdatePassword };

export const resetSelect = createSelector(
  (state) => state,
  (state) => state.reset
);

export default resetSlice.reducer;
