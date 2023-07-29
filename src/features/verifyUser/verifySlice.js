import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../hooks/axios";
import { BuilderHandleV3 } from "../../hooks/thunk";
import { toast } from "react-hot-toast";

let initialState = {
  verifyToken: null,
  error: null,
  status: "idle", // idle, failed, succeeded, loading
};

const Verify = createAsyncThunk(
  "verify/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await instance.get(`activeCode/${payload.code}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      });

      return { ...res.data, Auth: payload.login };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const verifySlice = createSlice({
  name: "verify",
  initialState,
  extraReducers: (builder) =>
    BuilderHandleV3(builder, Verify, (err, state, action) => {
      if (err) {
        const data = action.payload?.data;
        if (data?.error) {
          return toast.error(data?.error);
        }
        toast.error(data?.msg);
        return;
      }

      const data = action.payload;
      data?.Auth(data?.token);
      toast.success(data?.msg);
    }),
});

const selectVerify = (state) => state.verify;
export { selectVerify, Verify };
export default verifySlice.reducer;
