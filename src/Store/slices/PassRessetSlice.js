import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BuilderHanldeV2, FetchData } from "../../hooks/thunk";
import { toast } from "react-hot-toast";

const initialState = {
  error: [],
  loading: false,
  data: [],
};

export const PassResset = createAsyncThunk(
  "PassResset/auth",
  async (payload, { rejectWithValue }) => {
    try {
      const { body } = payload;
      return await FetchData("/auth/passReset", body, {});
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const PassRessetSlice = createSlice({
  name: "pass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    BuilderHanldeV2(
      builder,
      PassResset,
      (state, action) => {
        const { setaction, setparams, body } = action.meta.arg;
        const { message, next, nextNum } = action.payload;
        setparams({
          email: body.email,
          next,
          v: nextNum,
        });
        setaction((prev) => {
          if (nextNum === 2) {
            return {
              Email: true,
              code: false,
            };
          } else if (nextNum === 3) {
            return {
              Email: true,
              code: true,
            };
          } else if (nextNum === 4) {
            window.location.href = "/auth/signin";
            return {
              Email: false,
              code: false,
            };
          }
        });
        toast.success(message);
        console.log("send", action);
      },
      (state, action) => {
        const { error } = action.payload.response.data;
        toast.error(error);
      }
    );
  },
});

export default PassRessetSlice.reducer;
